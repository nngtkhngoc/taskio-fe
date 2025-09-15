import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";

export const CallToAction = () => {
  const { data: user } = useUser();
  const nav = useNavigate();

  return (
    <div className="relative flex flex-col gap-6 items-center justify-center py-20 px-5">
      <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      {/* Section label */}
      <div
        className="px-3 py-1 border-2 border-black rounded-sm shadow-secondary text-[10px] font-medium"
        data-aos="fade-down"
      >
        Start now
      </div>
      {/* Heading */}
      <h5 className="text-3xl font-bold" data-aos="zoom-in">
        Ready to take control of your student life?
      </h5>
      {/* Description */}
      <p
        className="text-[12px] sm:text-sm text-center text-zinc-600 max-w-md"
        data-aos="fade-up"
      >
        Start your journey to smarter time management today.
      </p>
      {/* CTA Button */}
      <div className="z-50" data-aos="zoom-in">
        <Button
          onClick={() => {
            if (user) {
              nav("/dashboard");
            } else {
              nav("/authenticate");
            }
          }}
        >
          <span>Try Now (Free)</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="absolute inset-x-0 -bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};
