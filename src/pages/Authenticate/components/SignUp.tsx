/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSignUp } from "@/hooks/useUser";

import { TriangleAlert } from "lucide-react";
import { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: doSignUp, isPending, isError, error } = useSignUp();

  const handleSignUp = () => {
    doSignUp(
      { email, password, confirm_password: confirmPassword },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  return (
    <Card className="flex flex-col gap-5">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription className="text-sm text-zinc-500">
          Create a new account easily
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
          <Input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {isError && (
          <div className="text-red-500 text-sm flex flex-row items-center justify-center gap-2 font-bold">
            <TriangleAlert className="w-4" />
            {(error as any)?.response?.data?.message ||
              "Sign up failed. Please try again."}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-blue-300 disabled:cursor-progress"
          onClick={handleSignUp}
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
};
