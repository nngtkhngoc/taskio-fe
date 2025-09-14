/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSignIn } from "@/hooks/useUser";

import { TriangleAlert } from "lucide-react";
import { useState } from "react";

export const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { mutate: doSignIn, isPending, isError, error } = useSignIn();

  const handleSignIn = () => {
    doSignIn(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Card className="flex flex-col gap-5">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription className="text-sm text-zinc-500">
          Access your account securely
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="signin-password">Password</Label>
          <Input
            id="signin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {isError && (
          <div className="text-red-500 text-sm flex flex-row items-center justify-center gap-2 font-bold">
            <TriangleAlert className="w-4" />
            {(error as any)?.response?.data?.message ||
              "Sign in failed. Please try again."}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-blue-300 disabled:cursor-progress"
          onClick={handleSignIn}
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
};
