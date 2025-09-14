import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/useUser";
import { Crown } from "lucide-react";

export const Information = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="w-9/10 pl-2 p-4 overflow-hidden rounded-xl border-2 border-black bg-blue-100 flex flex-row items-center gap-5 sm:p-7">
        {/* Avatar skeleton */}
        <Skeleton className="rounded-full sm:w-[80px] sm:h-[80px] w-[50px] h-[50px] md:w-[115px] md:h-[115px]" />

        {/* Info skeleton */}
        <div className="flex flex-col justify-between h-full items-start gap-2">
          <Skeleton className="h-6 w-[120px] sm:h-8 sm:w-[180px]" />{" "}
          {/* Name */}
          <Skeleton className="h-4 w-[150px] sm:w-[220px]" /> {/* Email */}
          <div className="flex flex-row justify-between items-center w-full mt-2 sm:mt-4 gap-5">
            <Skeleton className="h-6 w-[80px] rounded-3xl" />{" "}
            {/* Level badge */}
            <Skeleton className="h-4 w-[60px]" /> {/* XP */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-9/10 pl-2 p-4 overflow-hidden rounded-xl border-2 border-black bg-blue-100 flex flex-row items-center gap-5 sm:p-7">
      {/* Avatar */}
      <div className="p-7 border-black border-2 rounded-full bg-white text-blue-500 sm:w-[50px] sm:h-[50px] sm:p-14 w-[30px] h-[30px] flex items-center justify-center font-bold text-4xl">
        {user && typeof user.email === "string"
          ? user.email.trim().split("@")[0][0].toUpperCase()
          : ""}
      </div>
      {/* Information */}
      <div className="flex flex-col justify-between h-full items-start">
        <div className="text-2xl font-bold sm:text-4xl">
          {user && typeof user.email === "string"
            ? user.email.trim().split("@")[0]
            : ""}
        </div>
        <div className="text-sm text-start text-zinc-600">{user?.email}</div>
        <div className="flex flex-row justify-between items-center w-full mt-2 sm:mt-4">
          <div className="bg-blue-200 rounded-3xl border-2 border-black flex flex-row gap-1 px-2 font-bold text-sm items-center justify-center shadow-secondary">
            <Crown className="w-4" />
            Level {user?.level?.name ?? "0"}
          </div>
          <div className="text-sm text-zinc-700">{user?.xp ?? "0"}XP</div>
        </div>
      </div>
    </div>
  );
};
