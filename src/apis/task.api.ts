import { axiosClient } from "@/lib/axios";
import type { Task, CreateTaskData, DailyTaskRecord } from "@/types";

export interface GetTasksParams {
  page?: number;
  limit?: number;
}

export const getTasksByUserId = async (
  params: GetTasksParams = {}
): Promise<Task[]> => {
  const res = await axiosClient.get("/task", { params });
  return res?.data.data;
};

export const createTask = async (
  createTaskData: CreateTaskData
): Promise<Partial<Task>> => {
  const response = await axiosClient.post("/task", createTaskData);

  return response.data.data;
};

export const getTaskById = async (taskId: string): Promise<Partial<Task>> => {
  const response = await axiosClient.get(`/task/${taskId}`);

  return response.data.data;
};

export const updateTask = async (
  taskId: string,
  updateTaskData: Partial<Task>
): Promise<Partial<Task>> => {
  const response = await axiosClient.put(`/task/${taskId}`, updateTaskData);

  return response.data.data;
};

export const deleteTask = async (taskId: string): Promise<Partial<Task>> => {
  const response = await axiosClient.delete(`/task/${taskId}`);

  return response.data.data;
};

export const markTaskCompleted = async (
  taskId: string
): Promise<Partial<Task>> => {
  const response = await axiosClient.post(`/task/completed/${taskId}`);

  return response.data.data;
};

export const unmarkTaskCompleted = async (
  taskId: string
): Promise<Partial<Task>> => {
  const response = await axiosClient.delete(`/task/completed/${taskId}`);

  return response.data.data;
};

export const getDailyRecordForUser = async (
  from: Date,
  to: Date
): Promise<DailyTaskRecord[]> => {
  const res = await axiosClient.get(`/task/record?from=${from}&to=${to}`);
  return res?.data.data;
};

export const updateTaskPriority = async (
  taskId: string,
  data: { is_important?: boolean; is_urgent?: boolean }
): Promise<Task> => {
  const res = await axiosClient.put(`/task/priority/${taskId}`, data);
  return res.data.data;
};
