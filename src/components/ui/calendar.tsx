"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import * as React from "react";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "rounded border-2 border-black bg-blue-200 p-3 font-bold shadow-primary relative w-[300px]",
        className
      )}
      classNames={{
        root: cn("font-bold", classNames?.root),
        months: cn("flex flex-col sm:flex-row gap-2", classNames?.months),
        month: cn("flex flex-col gap-4", classNames?.month),
        month_caption: cn(
          "flex flex-row p-2 justify-center items-center  text-main-foreground text-sm font-heading",
          classNames?.month_caption
        ),
        button_previous: cn(
          buttonVariants({ variant: "noShadow" }),
          "size-7 bg-transparent p-0 absolute left-10",
          classNames?.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: "noShadow" }),
          "size-7 bg-transparent p-0 absolute right-10",
          classNames?.button_next
        ),
        month_grid: cn(
          "w-max-content border-collapse relative",
          classNames?.month_grid
        ),
        weekdays: cn("flex", classNames?.weekdays),
        weekday: cn(
          "text-main-foreground rounded w-9 text-[0.8rem] text-center",
          classNames?.weekday
        ),
        week: cn("flex w-full mt-2", classNames?.week),
        day: cn(
          buttonVariants({ variant: "noShadow" }),
          "size-9 p-0 font text-center focus:outline-none",
          classNames?.day
        ),
        selected: cn(" text-white rounded !bg-black", classNames?.selected),
        today: cn("bg-white text-foreground", classNames?.today),
        outside: cn("text-main-foreground opacity-50", classNames?.outside),
        disabled: cn(
          "text-main-foreground opacity-50 rounded",
          classNames?.disabled
        ),
        range_start: cn(
          "rounded-l bg-black text-white",
          classNames?.range_start
        ),
        range_end: cn("rounded-r bg-black text-white", classNames?.range_end),
        range_middle: cn("bg-black/50 text-white", classNames?.range_middle),
        hidden: cn("invisible", classNames?.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronCls, ...rest }) => {
          return orientation === "left" ? (
            <ChevronLeft className={cn("size-4", chevronCls)} {...rest} />
          ) : (
            <ChevronRight className={cn("size-4", chevronCls)} {...rest} />
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
