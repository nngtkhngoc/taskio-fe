import { AddNewTask } from "./components/AddNewTask";
import { FilterBar } from "./components/FilterBar";
import { TaskList } from "./components/TaskList";

import { useTasksForCurrentUser } from "@/hooks/useTask";
import type { FilterType } from "@/types";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<typeof tasks>();

  const { data: tasks, isPending } = useTasksForCurrentUser();

  useEffect(() => {
    if (!tasks) return;

    const newFilteredTasks = tasks.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.note?.toLowerCase().includes(searchQuery.toLowerCase());

      switch (filterType) {
        case "active":
          return (
            (task.status === "NOT_DONE" || task.status === "OVERDUE") &&
            matchesSearch
          );
        case "completed":
          return task.status === "COMPLETED" && matchesSearch;
        case "today": {
          const today = new Date().toDateString();
          return (
            task.deadline &&
            new Date(task.deadline).toDateString() === today &&
            matchesSearch
          );
        }
        case "week": {
          const weekFromNow = new Date();
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          const now = new Date();
          return (
            task.deadline &&
            new Date(task.deadline) <= weekFromNow &&
            new Date(task.deadline) >= now &&
            matchesSearch
          );
        }
        default:
          return matchesSearch;
      }
    });

    setFilteredTasks(newFilteredTasks);
  }, [tasks, filterType, searchQuery, isPending]);

  return (
    <div className="px-2 py-10 bg-sky-100 min-h-screen relative">
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="flex flex-col gap-5 px-2 sm:px-10 mx-auto justify-center items-center md:px-30 lg:px-50 xl:px-80">
        <AddNewTask />
        {/* <Streak user={mockUser} /> */}
        <FilterBar
          filterType={filterType}
          setFilterType={setFilterType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TaskList tasks={filteredTasks} isPending={isPending} />
      </div>
    </div>
  );
};
