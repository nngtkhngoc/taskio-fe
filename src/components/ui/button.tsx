/* eslint-disable react-refresh/only-export-components */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[6px] whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-black bg-blue-300 border-2 border-black shadow-primary hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none cursor-pointer disabled:cursor-not-allowed",
        oppositeDefault:
          "text-black bg-white border-2 border-black shadow-primary hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none cursor-pointer disabled:cursor-not-allowed",
        oppositeNoShadow:
          "text-blue-400 bg-white border-2 border-blue-400 hover:bg-blue-400 hover:text-white cursor-pointer transition-all duration-500 disabled:cursor-not-allowed",
        noShadow:
          "text-black bg-blue-300 border-2 border-black hover:bg-blue-400 cursor-pointer transition-all duration-500",
        neutral:
          "bg-blue-300 text-foreground border-2 border-border shadow-primary hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        reverse:
          "text-main-foreground bg-main border-2 border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
