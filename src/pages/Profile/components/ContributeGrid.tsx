import { useState } from "react";
import {
  startOfYear,
  endOfYear,
  startOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import { useDailyRecord } from "@/hooks/useTask";
import { Button } from "@/components/ui/button";

import type { DailyTaskRecord } from "@/types";

export const ContributeGrid = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const startDate = startOfYear(new Date(selectedYear, 0, 1));
  const endDate = endOfYear(new Date(selectedYear, 11, 31));

  const allDays = eachDayOfInterval({
    start: startOfWeek(startDate, { weekStartsOn: 0 }),
    end: endDate,
  });

  const { data: dailyRecords, isLoading: isRecordLoading } = useDailyRecord(
    startDate,
    endDate
  );

  const records: DailyTaskRecord[] = dailyRecords ?? [];

  // build map date → số task
  const dataMap = new Map(
    records.map((r) => [format(new Date(r.date), "yyyy-MM-dd"), r.tasks.length])
  );

  const maxCount =
    records.length > 0 ? Math.max(...records.map((r) => r.tasks.length)) : 0;

  // Render theo số task
  const getColor = (count: number) => {
    if (count === 0) return "bg-zinc-200";
    if (maxCount === 0) return "bg-zinc-200";

    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-blue-100";
    if (ratio <= 0.5) return "bg-blue-200";
    if (ratio <= 0.75) return "bg-blue-300";
    return "bg-blue-400";
  };

  if (isRecordLoading) {
    return (
      <div className="w-9/10 bg-sky-100 border border-black border-2 rounded p-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex flex-col overflow-auto max-w-screen scrollbar-hide bg-white items-center py-4 rounded">
          <div className="flex ml-8 mb-2 text-xs gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-6" />
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col mr-1 text-xs text-gray-400 justify-between items-start">
              <span>Sun</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="grid grid-flow-col auto-cols-max gap-[2px]">
              {Array.from({ length: 20 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {Array.from({ length: 7 }).map((__, dayIndex) => (
                    <Skeleton key={dayIndex} className="w-3 h-3 rounded-sm" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-9/10 bg-sky-100 border border-black border-2 rounded p-4 ">
      {/* Header: chọn năm */}
      <div className="flex items-center justify-between mb-2">
        <div className="mb-4">
          <h2 className="text-3xl font-bold">
            Activity Heatmap – {selectedYear}
          </h2>
          <p className="text-sm text-gray-500 mt-1 w-[500px]">
            Visualize your daily task completion over the year.
          </p>
        </div>

        <div className="flex gap-2 ">
          <Button
            onClick={() => setSelectedYear((y) => y - 1)}
            className="px-2 py-1 shadow-secondary "
          >
            « Prev
          </Button>
          <Button
            onClick={() => setSelectedYear((y) => y + 1)}
            className="px-2 py-1 shadow-secondary "
          >
            Next »
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col overflow-auto max-w-screen scrollbar-hide bg-white items-center py-4 rounded">
        {/* Row month */}
        <div className="flex ml-8 mb-1 text-xs text-gray-500">
          {Array.from({ length: Math.ceil(allDays.length / 7) }).map(
            (_, weekIndex) => {
              const firstDayOfWeek = allDays[weekIndex * 7];
              if (!firstDayOfWeek) return null;

              // Skip dates from prev year
              if (firstDayOfWeek.getFullYear() < selectedYear)
                return <div key={weekIndex} className="w-3 h-3 mr-[2px]" />;

              const month = firstDayOfWeek.getMonth();
              const prevWeek = allDays[(weekIndex - 1) * 7];
              const prevMonth =
                prevWeek && prevWeek.getFullYear() === selectedYear
                  ? prevWeek.getMonth()
                  : -1;

              return (
                <div
                  key={weekIndex}
                  className="w-3 h-3 mr-[2px] text-center"
                  style={{ minWidth: "12px" }}
                >
                  {month !== prevMonth ? format(firstDayOfWeek, "MMM") : ""}
                </div>
              );
            }
          )}
        </div>

        <div className="flex">
          {/* Days of week */}
          <div className="flex flex-col mr-1 text-xs text-gray-400 justify-between items-start">
            <span>Sun</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Weeks */}
          <div className="grid grid-flow-col auto-cols-max gap-[2px]">
            {Array.from({ length: Math.ceil(allDays.length / 7) }).map(
              (_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {Array.from({ length: 7 }).map((__, dayIndex) => {
                    const day = allDays[weekIndex * 7 + dayIndex];
                    if (!day) {
                      return (
                        <div
                          key={dayIndex}
                          className="w-3 h-3 bg-gray-100 rounded-sm"
                        />
                      );
                    }

                    if (day.getFullYear() < selectedYear) {
                      return (
                        <div
                          key={dayIndex}
                          className="w-3 h-3 bg-transparent rounded-sm"
                        />
                      );
                    }

                    const dateStr = format(day, "yyyy-MM-dd");
                    const count = dataMap.get(dateStr) || 0;
                    return (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                        title={`${dateStr}: ${count} task(s)`}
                      />
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
