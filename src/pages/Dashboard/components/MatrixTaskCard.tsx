import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import type { Subtask, Task } from "@/types";

import {
  Plus,
  Trash2,
  Star,
  AlarmClock,
  Edit2,
  Clock,
  Briefcase,
  User,
  Book,
  Palette,
  AlignJustify,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MatrixTaskCardProps {
  task: Task;
  tasks?: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[] | undefined>>;
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
export const MatrixTaskCard: React.FC<MatrixTaskCardProps> = ({
  task,
  tasks,
  setTasks,
  onEdit,
  onDelete,
  onToggleCompleted,
}) => {
  const [name, setName] = useState(task.name);
  const [note, setNote] = useState(task.note || "");
  const [deadline, setDeadline] = useState<Date>(new Date(task.deadline));
  const [important, setImportant] = useState(task.is_important);
  const [urgent, setUrgent] = useState(task.is_urgent);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(task.category);
  useEffect(() => {
    setName(task.name);
    setNote(task.note || "");
    setDeadline(new Date(task.deadline));
    setImportant(task.is_important);
    setUrgent(task.is_urgent);
    setSubtasks(task.subtasks || []);
  }, [task]);

  const formatDeadline = (deadline: Date | null, completedAt?: Date | null) => {
    if (!deadline) return null;

    const referenceDate = completedAt ? new Date(completedAt) : new Date();
    referenceDate.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    return deadlineDate.toLocaleDateString();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  // SUBTASK
  const handleToggleCompleted = (id: string, checked: boolean) => {
    setSubtasks(
      subtasks.map((s) => (s.id === id ? { ...s, is_completed: checked } : s))
    );
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    const sub = {
      id: crypto.randomUUID(),
      name: newSubtask,
      is_completed: false,
    };
    console.log(subtasks);
    setSubtasks((prev) => [...prev, sub]);
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  //CATEGORY
  const colorCategoryBg = {
    pink: {
      bg: "bg-pink-100",
      hoverBg: "hover:bg-pink-100",
      text: "text-pink-600",
    },
    lime: {
      bg: "bg-lime-100",
      hoverBg: "hover:bg-lime-100",
      text: "text-lime-600",
    },
    amber: {
      bg: "bg-amber-100",
      hoverBg: "hover:bg-amber-100",
      text: "text-amber-600",
    },
    zinc: {
      bg: "bg-zinc-100",
      hoverBg: "hover:bg-zinc-100",
      text: "text-zinc-600",
    },
    sky: {
      bg: "bg-sky-100",
      hoverBg: "hover:bg-sky-100",
      text: "text-sky-600",
    },
  };

  const categoryOptions = [
    {
      value: "Work",
      label: "Work",
      color: "amber",
      icon: Briefcase,
    },
    {
      value: "Personal",
      label: "Personal",
      color: "sky",
      icon: User,
    },
    {
      value: "Study",
      label: "Study",
      color: "pink",
      icon: Book,
    },
    {
      value: "Hobby",
      label: "Hobby",
      color: "lime",
      icon: Palette,
    },
    {
      value: "Other",
      label: "Other",
      color: "zinc",
      icon: AlignJustify,
    },
  ];

  const categoryMap: Record<
    string,
    { text: string; hoverBg: string; icon: React.ElementType; bg: string }
  > = categoryOptions.reduce((acc, { value, color, icon }) => {
    acc[value] = {
      ...colorCategoryBg[color as keyof typeof colorCategoryBg],
      icon,
    };
    return acc;
  }, {} as Record<string, { text: string; hoverBg: string; icon: React.ElementType; bg: string }>);

  const handleCategoryChange = (value: string) => {
    console.log(selectedCategories);
    if (!selectedCategories.includes(value))
      setSelectedCategories([...selectedCategories, value]);
  };

  const renderSelectedCategories = () => (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedCategories.map((cat) => {
        const info = categoryMap[cat];
        const Icon = info.icon;
        return (
          <div
            key={cat}
            className={cn(
              `flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium px-2 py-2  border border-2 border-black`,
              info.text,
              info.bg
            )}
          >
            <Icon size={14} />
            {cat}
            <button
              type="button"
              onClick={() =>
                setSelectedCategories(
                  selectedCategories.filter((v) => v !== cat)
                )
              }
              className="ml-1 text-gray-500 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );

  const renderCategoryOptions = () =>
    categoryOptions.map(({ value, label, icon: Icon }) => {
      const info = categoryMap[value];
      return (
        <SelectItem
          key={value}
          value={value}
          className={cn(info.text, info.hoverBg, "flex items-center gap-2")}
        >
          <Icon size={16} />
          {label}
        </SelectItem>
      );
    });

  //api
  const updateTask = () => {
    const updatedTaskData: Partial<Task> = {
      name,
      note,
      deadline: deadline ?? null,
      is_important: important,
      is_urgent: urgent,
      category: selectedCategories,
      subtasks,
    };

    onEdit(
      task.id,
      name,
      note,
      deadline ?? null,
      important,
      urgent,
      selectedCategories,
      subtasks
    );

    if (tasks && setTasks) {
      setTasks(
        tasks
          .reduce((acc, t) => {
            if (t.id === task.id) {
              if (
                t.is_important !== updatedTaskData.is_important ||
                t.is_urgent !== updatedTaskData.is_urgent
              ) {
                return acc;
              }
              acc.push({ ...t, ...updatedTaskData });
              return acc;
            }
            acc.push(t);
            return acc;
          }, [] as Task[])
          .sort((a, b) => {
            const da = a.deadline ? new Date(a.deadline).getTime() : 0;
            const db = b.deadline ? new Date(b.deadline).getTime() : 0;
            return da - db;
          })
      );
    }
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask();
  };

  const deleteTask = (taskId: string) => {
    if (tasks && setTasks) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
    onDelete(taskId);
    setIsDialogOpen(false);
  };

  const handleToggleTaskCompleted = (checked: boolean) => {
    const now = new Date();

    if (tasks && setTasks) {
      setTasks(
        tasks.map((t) => {
          if (t.id !== task.id) return t;

          let newStatus: "COMPLETED" | "OVERDUE" | "NOT_DONE";
          if (checked) {
            newStatus = "COMPLETED";
          } else {
            const deadlineDate = t.deadline ? new Date(t.deadline) : null;
            newStatus =
              deadlineDate && deadlineDate < now ? "OVERDUE" : "NOT_DONE";
          }

          return {
            ...t,
            status: newStatus,
            subtasks: t.subtasks?.map((s) => ({
              ...s,
              is_completed: checked,
            })),
          };
        })
      );
    }

    onToggleCompleted(task.id, checked);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`group p-3 w-full bg-white dark:bg-gray-700 rounded-lg shadow-sm border cursor-move transition-all duration-200 hover:shadow-md hover:scale-[1.02] 
    ${
      task.status === "COMPLETED"
        ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
        : task.deadline && new Date(task.deadline) < new Date()
        ? "border-red-500 dark:border-red-700 border-2"
        : "border-gray-200 dark:border-gray-600"
    }`}
    >
      <div className="flex items-center w-full justify-between mb-2">
        {" "}
        <div className="flex flex-row gap-2 justify-center items-center">
          <Checkbox
            checked={task.status === "COMPLETED"}
            onCheckedChange={handleToggleTaskCompleted}
            // disabled={isCompeleting || isUnCompeleting}
          />
          <h4
            className={`font-medium text-sm  ${
              task.status === "COMPLETED"
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {task.name}
          </h4>
        </div>
        <div className=" items-end flex flex-row justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className=" p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer">
                <Edit2 size={14} />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]  max-h-[90vh] overflow-y-auto scrollbar-hide">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>Edit your task here</DialogDescription>
              </DialogHeader>

              <form className="grid gap-4" onSubmit={handleSubmit}>
                {/* Task name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Task <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Note */}
                <div className="grid gap-2">
                  <Label htmlFor="note">Note</Label>
                  <Input
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {/* Deadline */}
                <div className="w-4/5 pb-3">
                  <Label>Deadline</Label>
                  <Calendar
                    required
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                  />
                </div>

                {/* Category */}
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    onValueChange={(value) => handleCategoryChange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>{renderCategoryOptions()}</SelectContent>
                  </Select>
                  {renderSelectedCategories()}
                </div>

                {/* Priority */}
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <div className="flex gap-3">
                    <Toggle
                      pressed={important}
                      onPressedChange={setImportant}
                      className={cn(
                        "border border-2 border-black bg-white data-[state=on]:bg-yellow-200 data-[state=on]:text-yellow-800"
                      )}
                    >
                      <Star /> Important
                    </Toggle>
                    <Toggle
                      pressed={urgent}
                      onPressedChange={setUrgent}
                      className={cn(
                        "border border-2 border-black bg-white data-[state=on]:bg-red-200 data-[state=on]:text-red-800"
                      )}
                    >
                      <AlarmClock /> Urgent
                    </Toggle>
                  </div>
                </div>

                {/* SubTasks */}
                <div className="grid gap-2">
                  <Label>Subtasks</Label>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter subtask..."
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSubtask();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant={"noShadow"}
                      onClick={handleAddSubtask}
                      disabled={!newSubtask.trim()}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {subtasks.length > 0 &&
                      subtasks.map(
                        (subtask) =>
                          subtask.name && (
                            <div
                              key={subtask.id}
                              className="flex items-center justify-between bg-white !border !border-black !border-2 rounded-md py-2 px-2"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={subtask.is_completed}
                                  onCheckedChange={(checked) =>
                                    handleToggleCompleted(
                                      subtask.id,
                                      Boolean(checked)
                                    )
                                  }
                                />
                                <span
                                  className={`text-sm ${
                                    subtask.is_completed
                                      ? "line-through text-gray-500"
                                      : ""
                                  }`}
                                >
                                  {subtask.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveSubtask(subtask.id)}
                                className="cursor-pointer"
                              >
                                <Trash2 className="w-4 text-zinc-700 hover:text-red-600 transition-all duration-300" />
                              </button>
                            </div>
                          )
                      )}
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="oppositeDefault">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="button" onClick={handleSubmit}>
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            onClick={() => deleteTask(task.id)}
            className={` p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-600 transition-all duration-200 cursor-pointer"`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {/* Deadline */}
      {task.deadline && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          {(() => {
            const deadlineDate = new Date(task.deadline);

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dDate = new Date(deadlineDate);
            dDate.setHours(0, 0, 0, 0);

            if (dDate < today && task.status !== "COMPLETED") {
              return (
                <span className="text-red-600 font-medium flex items-center gap-1">
                  🔥 {formatDeadline(deadlineDate)}
                </span>
              );
            } else if (
              dDate.getTime() === today.getTime() &&
              task.status !== "COMPLETED"
            ) {
              return (
                <span className="text-yellow-600 font-medium flex items-center gap-1">
                  ⚠️ Today
                </span>
              );
            } else {
              const completedAt = task.completed_at
                ? new Date(task.completed_at)
                : new Date();

              return (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Clock size={10} />
                  {formatDeadline(deadlineDate, completedAt)}
                </div>
              );
            }
          })()}
        </div>
      )}
      {/* Categories */}
      <div className=" flex flex-row justify-between items-center">
        {task.category && task.category.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.category.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <div>
          {task.subtasks && task.subtasks.length > 0 && (
            <span className="inline-flex items-center text-xs font-semibold text-zinc-500">
              {task.subtasks.filter((st) => st.is_completed).length}/
              {task.subtasks.length} (subtasks)
            </span>
          )}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
