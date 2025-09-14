/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type { Subtask, Task } from "@/types";
import { MatrixTaskCard } from "./MatrixTaskCard";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CalendarIcon,
  MoreHorizontal,
} from "lucide-react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MatrixQuadrantProps {
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tasks: Task[] | undefined;
  onDrop: (taskId: string) => void;
  onEdit: (
    taskId: string,
    name: string,
    note: string,
    deadline: Date,
    is_important: boolean,
    is_urgent: boolean,
    category: string[],
    subtasks: Subtask[]
  ) => void;
  onDelete: (taskId: string) => void;
  onToggleCompleted: (taskId: string, checked: boolean) => void;
}

export const MatrixQuadrant: React.FC<MatrixQuadrantProps> = ({
  title,
  subtitle,
  color,
  bgColor,
  borderColor,
  tasks,
  onDrop,
  onEdit,
  onDelete,
  onToggleCompleted,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredTasks, setFilteredTasks] = useState<Task[] | undefined>(tasks);
  const [sortBy, setSortBy] = useState<
    "deadlineAsc" | "deadlineDesc" | "createdAsc" | "createdDesc"
  >("deadlineDesc");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onDrop(taskId);
  };

  const handleFilterAndSort = () => {
    const start = dateRange.start ? new Date(dateRange.start) : null;
    const end = dateRange.end ? new Date(dateRange.end) : dateRange.start;

    const newTasks = tasks?.filter((task) => {
      const deadline = task.deadline ? new Date(task.deadline) : null;
      if (!deadline) return true;
      if (start && deadline < start) return false;
      if (end && deadline > end) return false;
      return true;
    });

    newTasks?.sort((a, b) => {
      let compare = 0;
      if (sortBy.startsWith("deadline")) {
        const d1 = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const d2 = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        compare = d1 - d2;
        if (sortBy === "deadlineAsc") compare *= -1;
      } else {
        const c1 = new Date(a.created_at).getTime();
        const c2 = new Date(b.created_at).getTime();
        compare = c1 - c2;
        if (sortBy === "createdAsc") compare *= -1;
      }
      return compare;
    });

    setFilteredTasks(newTasks);
    setCurrentPage(1);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil((filteredTasks?.length ?? 0) / tasksPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    handleFilterAndSort();
  }, [sortBy, dateRange]);

  return (
    <div
      className={`${bgColor} ${borderColor} border-2 flex flex-col border-dashed rounded-xl sm:p-6 p-4 h-[350px] transition-all duration-200 hover:border-opacity-100`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="mb-4 flex justify-between items-start flex-row ">
        <div>
          <div
            className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${color} mb-2`}
          >
            {subtitle}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <Dialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open);
            if (!open) {
              setDateRange({ start: "", end: "" });
              setSortBy("deadlineDesc");
              setCurrentPage(1);
              setFilteredTasks(tasks);
            }
          }}
        >
          <DialogTrigger asChild>
            <button
              className="text-sm text-zinc-500 hover:scale-[1.1] cursor-pointer transition-all duration-500"
              onClick={() => {
                setShowDialog(true);
                setFilteredTasks(tasks);
              }}
            >
              <MoreHorizontal />
            </button>
          </DialogTrigger>
          {/* Dialog */}
          {showDialog && (
            <DialogContent className="sm:max-w-[425px]  max-h-[90vh] overflow-y-auto scrollbar-hide">
              <DialogHeader>
                <DialogTitle>Task List - {title}</DialogTitle>
                <DialogDescription>
                  View and manage all tasks in this quadrant. Add details, set
                  deadlines, and track progress.{" "}
                </DialogDescription>
              </DialogHeader>

              {/* Date Filter + Sort */}
              <div className="flex flex-col gap-1 mb-4">
                {/* Date Filter */}
                <div className="flex flex-row gap-2 mb-4 w-9/10">
                  <Popover>
                    <div className="flex flex-col w-1/2 gap-1">
                      <span className="text-sm font-bold">From: </span>
                      <PopoverTrigger asChild>
                        <Button
                          variant="noShadow"
                          className=" justify-start text-left font-base w-full"
                        >
                          <CalendarIcon />
                          {dateRange.start ? (
                            format(dateRange.start, "PPP")
                          ) : (
                            <span>Pick start date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className=" w-auto border-0! p-0">
                      <Calendar
                        mode="single"
                        selected={
                          dateRange.start
                            ? new Date(dateRange.start)
                            : undefined
                        }
                        onSelect={(value) => {
                          if (value) {
                            const newDate = new Date(value);
                            newDate.setDate(newDate.getDate() + 1);
                            setDateRange({
                              ...dateRange,
                              start: newDate.toISOString().slice(0, 10),
                            });
                          } else {
                            setDateRange({
                              ...dateRange,
                              start: "",
                            });
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <div className="flex flex-col w-1/2 gap-1">
                      <span className="text-sm font-bold">To: </span>
                      <PopoverTrigger asChild>
                        <Button
                          variant="noShadow"
                          className=" justify-start text-left font-base w-full"
                          disabled={!dateRange.start}
                        >
                          <CalendarIcon />
                          {dateRange.end ? (
                            format(dateRange.end, "PPP")
                          ) : (
                            <span>Pick end date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-auto border-0! p-0">
                      <Calendar
                        mode="single"
                        selected={
                          dateRange.end
                            ? new Date(dateRange.end)
                            : new Date(dateRange.start)
                        }
                        onSelect={(value) => {
                          if (value) {
                            const newDate = new Date(value);
                            newDate.setDate(newDate.getDate() + 1);
                            setDateRange({
                              ...dateRange,
                              end: newDate
                                ? newDate.toISOString().slice(0, 10)
                                : "",
                            });
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Sort */}
                <div className="flex gap-2 flex-col">
                  <div className="text-sm font-bold">Sort:</div>
                  {/* Type toggle */}
                  <div className="flex gap-1">
                    <Toggle
                      pressed={sortBy.includes("deadline")}
                      onPressedChange={() =>
                        setSortBy((prev) =>
                          prev.includes("created")
                            ? "deadlineDesc"
                            : prev === "deadlineAsc"
                            ? "deadlineDesc"
                            : "deadlineAsc"
                        )
                      }
                      className={cn(
                        "border border-2 border-black bg-white data-[state=on]:bg-blue-300 data-[state=on]:text-black cursor-pointer"
                      )}
                    >
                      {sortBy == "deadlineAsc" ? (
                        <div className="flex flex-row gap-1 items-center justify-center">
                          <ArrowUpWideNarrow />
                          Deadline
                        </div>
                      ) : (
                        <div className="flex flex-row gap-1 items-center justify-center">
                          <ArrowDownWideNarrow />
                          Deadline
                        </div>
                      )}
                    </Toggle>

                    <Toggle
                      pressed={sortBy.includes("created")}
                      onPressedChange={() =>
                        setSortBy((prev) =>
                          prev.includes("deadline")
                            ? "createdDesc"
                            : prev === "createdAsc"
                            ? "createdDesc"
                            : "createdAsc"
                        )
                      }
                      className={cn(
                        "border border-2 border-black bg-white data-[state=on]:bg-blue-300 data-[state=on]:text-black cursor-pointer"
                      )}
                    >
                      {sortBy == "createdAsc" ? (
                        <div className="flex flex-row gap-1 items-center justify-center">
                          <ArrowUpWideNarrow />
                          Created
                        </div>
                      ) : (
                        <div className="flex flex-row gap-1 items-center justify-center">
                          <ArrowDownWideNarrow />
                          Created
                        </div>
                      )}
                    </Toggle>
                  </div>
                </div>
              </div>

              {/* Task List (Pagination) */}
              <div className="flex flex-col gap-2 w-full">
                <div className="text-sm font-bold text-start">Tasks:</div>
                <div className=" flex flex-col gap-2 justify-center items-center rounded-xl w-full">
                  {currentTasks && currentTasks.length > 0 ? (
                    currentTasks.map((task) => (
                      <MatrixTaskCard
                        key={task.id}
                        task={task}
                        tasks={filteredTasks}
                        setTasks={setFilteredTasks}
                        onEdit={(
                          taskId: string,
                          name: string,
                          note: string,
                          deadline: Date,
                          is_important: boolean,
                          is_urgent: boolean,
                          category: string[],
                          subtasks: Subtask[]
                        ) =>
                          onEdit(
                            taskId,
                            name,
                            note,
                            deadline,
                            is_important,
                            is_urgent,
                            category,
                            subtasks
                          )
                        }
                        onDelete={(taskId: string) => onDelete(taskId)}
                        onToggleCompleted={(taskId, checked) =>
                          onToggleCompleted(taskId, checked)
                        }
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                      No tasks found
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <DialogFooter>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </DialogFooter>
              )}
            </DialogContent>
          )}
        </Dialog>
      </div>

      {/* Tasks */}
      <div className="space-y-3 h-full overflow-y-auto scrollbar-hide p-2">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <MatrixTaskCard
              key={task.id}
              task={task}
              onEdit={(
                taskId: string,
                name: string,
                note: string,
                deadline: Date,
                is_important: boolean,
                is_urgent: boolean,
                category: string[],
                subtasks: Subtask[]
              ) =>
                onEdit(
                  taskId,
                  name,
                  note,
                  deadline,
                  is_important,
                  is_urgent,
                  category,
                  subtasks
                )
              }
              onDelete={(taskId: string) => onDelete(taskId)}
              onToggleCompleted={(taskId, checked) =>
                onToggleCompleted(taskId, checked)
              }
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500   ">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};
