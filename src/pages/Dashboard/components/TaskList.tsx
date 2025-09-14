import { EisenhowerMatrix } from "./EisenHowerMatrix";

import type { Task } from "@/types";

interface TaskListProps {
  tasks: Task[] | undefined;
  isPending: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, isPending }) => {
  if (isPending) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-white p-6 border border-2 border-black rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl w-full h-[300px]  border-2 border-black bg-gray-200 dark:bg-gray-800 h-24 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks && tasks.length === 0) {
    return (
      <div className="w-full">
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border-2 border-black">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-300 border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-8 h-8 bg-blue-500 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
          </div>
          <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
            No tasks found
          </h3>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Add a new task and smash your productivity goals!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <EisenhowerMatrix tasks={tasks} />
    </div>
  );
};
