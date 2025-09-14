// src/components/ProtectedRoute.tsx
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { getCurrentUser } from "@/apis/auth.api";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isLoading || user) return <>{children}</>;

  if (isError || !user) {
    return <Navigate to="/authenticate" replace />;
  }
};
