import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markTaskCompleted,
  unmarkTaskCompleted,
  getDailyRecordForUser,
  updateTaskPriority,
} from "@/apis/task.api";
import type { Task, CreateTaskData } from "@/types";

const TASKS_KEY = ["tasks"];
const TASK_KEY = (id: string) => ["task", id];
const DAILY_RECORD_KEY = ["dailyRecord"];

export const useTasksForCurrentUser = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...TASKS_KEY, params],
    queryFn: () => getTasksByUserId(params),
  });
};

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: TASK_KEY(taskId),
    queryFn: () => getTaskById(taskId),
    enabled: !!taskId,
  });
};

export const useDailyRecord = (from: Date, to: Date) => {
  return useQuery({
    queryKey: [...DAILY_RECORD_KEY, { from, to }],
    queryFn: () => getDailyRecordForUser(from, to),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskData) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      queryClient.invalidateQueries({ queryKey: DAILY_RECORD_KEY });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      updateTask(taskId, data),

    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });

      const prevTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);

      if (prevTasks) {
        queryClient.setQueryData<Task[]>(
          TASKS_KEY,
          (old) =>
            old?.map((task) =>
              task.id === taskId ? { ...task, ...data } : task
            ) ?? []
        );
      }

      return { prevTasks };
    },

    onError: (_err, _vars, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(TASKS_KEY, context.prevTasks);
      }
    },

    onSettled: (_data, _error, { taskId }) => {
      const keysToInvalidate = [
        { queryKey: TASKS_KEY },
        { queryKey: TASK_KEY(taskId) },
        { queryKey: DAILY_RECORD_KEY },
        { queryKey: ["currentUser"] },
      ];
      keysToInvalidate.forEach((key) => queryClient.invalidateQueries(key));
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      queryClient.invalidateQueries({ queryKey: DAILY_RECORD_KEY });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useMarkTaskCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => markTaskCompleted(taskId),
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      queryClient.invalidateQueries({ queryKey: TASK_KEY(taskId) });
      queryClient.invalidateQueries({ queryKey: DAILY_RECORD_KEY });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useUnmarkTaskCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => unmarkTaskCompleted(taskId),
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      queryClient.invalidateQueries({ queryKey: TASK_KEY(taskId) });
      queryClient.invalidateQueries({ queryKey: DAILY_RECORD_KEY });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useUpdateTaskPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: { is_important?: boolean; is_urgent?: boolean };
    }) => updateTaskPriority(taskId, data),

    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });

      const prevTasks = queryClient.getQueryData<Task[]>(TASKS_KEY);

      if (prevTasks) {
        queryClient.setQueryData<Task[]>(
          TASKS_KEY,
          (old) =>
            old?.map((task) =>
              task.id === taskId ? { ...task, ...data } : task
            ) ?? []
        );
      }

      return { prevTasks };
    },

    onError: (_err, _vars, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(TASKS_KEY, context.prevTasks);
      }
    },

    onSettled: (_, __, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      queryClient.invalidateQueries({ queryKey: TASK_KEY(taskId) });
    },
  });
};
