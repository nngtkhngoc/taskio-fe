/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { MatrixQuadrant } from "./MatrixQuadrant";
import type { Subtask, Task } from "@/types";
import {
  useDeleteTask,
  useMarkTaskCompleted,
  useUnmarkTaskCompleted,
  useUpdateTask,
  useUpdateTaskPriority,
} from "@/hooks/useTask";

interface EisenhowerMatrixProps {
  tasks: Task[] | undefined;
}

export const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({
  tasks,
}) => {
  const quadrants = [
    {
      title: "Urgent & Important",
      subtitle: "Do First",
      is_urgent: true,
      is_important: true,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
    },
    {
      title: "Not Urgent & Important",
      subtitle: "Schedule",
      is_urgent: false,
      is_important: true,
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Urgent & Not Important",
      subtitle: "Delegate",
      is_urgent: true,
      is_important: false,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      title: "Not Urgent & Not Important",
      subtitle: "Delete",
      is_urgent: false,
      is_important: false,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-700",
    },
  ];

  const [matrixTasks, setMatrixTasks] = useState<Task[] | undefined>(tasks);

  useEffect(() => {
    setMatrixTasks(tasks);
  }, [tasks]);

  const { mutate: updatePriority } = useUpdateTaskPriority();

  const handleDrop = (
    taskId: string,
    is_urgent: boolean,
    is_important: boolean
  ) => {
    if (!matrixTasks) return;

    const updatedTasks = matrixTasks.map((task) =>
      task.id === taskId ? { ...task, is_urgent, is_important } : task
    );

    setMatrixTasks(updatedTasks);

    updatePriority({ taskId, data: { is_important, is_urgent } });
  };

  const { mutate: updateTaskMutate } = useUpdateTask();
  const updateTask = (
    taskId: string,
    name: string,
    note: string,
    deadline: Date,
    is_important: boolean,
    is_urgent: boolean,
    category: string[],
    subtasks: Subtask[]
  ) => {
    const updatedTaskData: Partial<Task> = {
      name,
      note,
      deadline: deadline ?? null,
      is_important: is_important,
      is_urgent: is_urgent,
      category: category,
      subtasks,
    };

    setMatrixTasks(
      matrixTasks
        ?.reduce((acc, t) => {
          if (t.id === taskId) {
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

    toast.success("Task updated successfully");
    updateTaskMutate(
      { taskId: taskId, data: updatedTaskData },
      {
        onError: (err: any) => {
          console.error(err);
          toast.error("Error updating task: " + (err.message || err));
        },
      }
    );
  };

  const { mutate: deleteTaskMutate } = useDeleteTask();

  const deleteTask = (taskId: string) => {
    setMatrixTasks(tasks?.filter((t) => t.id !== taskId));
    toast.success("Delete task successfully");

    deleteTaskMutate(taskId, {
      onError: (err: any) => {
        toast.error("Error deleting task: " + (err.message || err));
      },
    });
  };

  const { mutate: markCompleted } = useMarkTaskCompleted();
  const { mutate: unmarkCompleted } = useUnmarkTaskCompleted();

  const getNewStatus = (
    checked: boolean,
    deadline?: Date | null
  ): "COMPLETED" | "OVERDUE" | "NOT_DONE" => {
    if (checked) return "COMPLETED";

    const now = new Date();
    if (deadline && deadline < now) return "OVERDUE";
    return "NOT_DONE";
  };

  const handleToggleTaskCompleted = (taskId: string, checked: boolean) => {
    if (!matrixTasks) return;

    setMatrixTasks(
      matrixTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: getNewStatus(
                checked,
                t.deadline ? new Date(t.deadline) : null
              ),
              subtasks: t.subtasks?.map((s) => ({
                ...s,
                is_completed: checked,
              })),
            }
          : t
      )
    );

    checked ? markCompleted(taskId) : unmarkCompleted(taskId);

    toast.success(
      checked ? "Task marked as completed" : "Task marked as pending"
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-6 border border-2 border-black rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrants.map((quadrant) => (
          <MatrixQuadrant
            key={`${quadrant.is_urgent}-${quadrant.is_important}`}
            title={quadrant.title}
            subtitle={quadrant.subtitle}
            color={quadrant.color}
            bgColor={quadrant.bgColor}
            borderColor={quadrant.borderColor}
            tasks={matrixTasks?.filter(
              (task) =>
                task.is_urgent === quadrant.is_urgent &&
                task.is_important === quadrant.is_important
            )}
            onDrop={(taskId) =>
              handleDrop(taskId, quadrant.is_urgent, quadrant.is_important)
            }
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
              updateTask(
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
            onDelete={(taskId: string) => deleteTask(taskId)}
            onToggleCompleted={(taskId, checked) =>
              handleToggleTaskCompleted(taskId, checked)
            }
          />
        ))}
      </div>
    </div>
  );
};
