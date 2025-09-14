import { axiosClient } from "@/lib/axios";
import type { SignInData, SignUpData, User } from "@/types/index";

export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export const signIn = async (signInData: SignInData): Promise<User> => {
  const response = await axiosClient.post("/auth/sign-in", signInData);

  return response.data.data;
};

export const signUp = async (signUpData: SignUpData): Promise<User> => {
  const response = await axiosClient.post("/auth/sign-up", signUpData);

  return response.data.data;
};

export const signOut = async (): Promise<void> => {
  const response = await axiosClient.post("/auth/sign-out");

  return response.data.message;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosClient.get("/auth/me");
  return response.data.data;
};
