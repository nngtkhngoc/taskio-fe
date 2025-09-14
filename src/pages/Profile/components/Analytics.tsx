import { PieChart as RePieChart, Pie, Cell, Tooltip } from "recharts";
import { CheckCircle, ListTodo, PieChart } from "lucide-react";
import React from "react";

import { useUser } from "@/hooks/useUser";

import { Skeleton } from "@/components/ui/skeleton";

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change?: string;
  isLoading?: boolean;
}> = ({ title, value, icon: Icon, color, change, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-2 border-black shadow-secondary w-[250px] h-[170px] flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-2 border-black shadow-secondary w-[250px] h-[170px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {change && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

export const Analytics = () => {
  const { data: user, isLoading } = useUser();

  const stats = {
    totalTasks: user?.tasks?.length || 0,
    completed:
      user?.tasks?.filter((task) => task.status == "COMPLETED").length || 0,
    growth: 12,
    priorities: {
      high: 10,
      medium: 20,
      low: 12,
    },
  };

  const priorities = {
    urgentImportant:
      user?.tasks?.filter((task) => task.is_important && task.is_urgent)
        .length || 0,

    importantNotUrgent:
      user?.tasks?.filter((task) => task.is_important && !task.is_urgent)
        .length || 0,

    urgentNotImportant:
      user?.tasks?.filter((task) => !task.is_important && task.is_urgent)
        .length || 0,

    neither:
      user?.tasks?.filter((task) => !task.is_important && !task.is_urgent)
        .length || 0,
  };

  const priorityData = [
    { name: "Do First", value: priorities.urgentImportant },
    { name: "Schedule", value: priorities.importantNotUrgent },
    { name: "Delegate", value: priorities.urgentNotImportant },
    { name: "Delete", value: priorities.neither },
  ];

  const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#9ca3af"];

  return (
    <div className="border border-2 border-black w-9/10 p-4 rounded bg-white">
      <h5 className="text-3xl font-bold px-3">Analytics </h5>
      <p className="text-zinc-800 text-sm pb-5 px-3">
        Track your productivity and performance
      </p>
      <div className="flex flex-col items-center justify-center gap-5 sm:grid grid-cols-2 lg:grid-cols-3 sm:place-items-center w-full">
        <StatCard
          title="Total Tasks"
          value={String(stats.totalTasks)}
          icon={ListTodo}
          color="bg-blue-500"
          isLoading={isLoading}
        />

        <StatCard
          title="Completed"
          value={String(stats.completed)}
          icon={CheckCircle}
          color="bg-green-500"
          change={`+${stats.growth}% from last week`}
          isLoading={isLoading}
        />

        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl px-6 py-4 border border-2 border-black shadow-secondary w-[250px] h-[170px] sm:w-[230px]">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Priority Distribution
                </p>
                <div className="p-3 rounded-lg bg-red-500">
                  <PieChart className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center">
                <RePieChart width={80} height={80}>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {priorityData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
                <ul className="ml-4 text-xs space-y-1">
                  {priorityData.map((item, index) => (
                    <li key={item.name} className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ background: COLORS[index] }}
                      />
                      {item.name}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
