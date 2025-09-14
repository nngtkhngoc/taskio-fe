import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { getCurrentUser, signIn, signOut, signUp } from "@/apis/auth.api";
import type { SignInData, SignUpData, User } from "@/types/index";

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation<User, Error, SignInData>({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data);
      nav("/");
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation<User, Error, SignUpData>({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data);
      nav("/");
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation<void, Error>({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      nav("/");
    },
  });
};
