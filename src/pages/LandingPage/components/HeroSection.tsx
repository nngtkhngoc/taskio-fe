import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import { useUser } from "@/hooks/useUser";

import { ArrowRight, Play, Sparkle, Star } from "lucide-react";
import { useNavigate } from "react-router";

export const HeroSection = () => {
  const { data: user } = useUser();
  const nav = useNavigate();

  const marqueeText = [
    "Fast & simple task manager 📚",
    "Track your progress 📊",
    "Stay productive everyday ⏰",
    "Fast & simple task manager 📚",
    "Track your progress 📊",
    "Stay productive everyday ⏰",
  ];

  return (
    <div className="relative h-full w-full overflow-hidden" data-aos="zoom-in">
      <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="flex flex-col justify-center items-center gap-6 sm:px-30 px-10 py-10 sm:py-15 xl:py-20 ">
        <div className="px-4 py-1 border-2 border-black rounded-[30px] flex flex-row items-center justify-center gap-1 font-bold shadow-secondary">
          <Star className="w-[12px]" />
          <span className="text-sm">100% free no ads!</span>
          <Sparkle className="w-[12px]" />
        </div>

        <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight">
          Navigate your life with
          <SparklesText>Taskio!</SparklesText>
        </div>

        <p className="text-zinc-600 text-[14px] sm:text-[18px] text-center whitespace-nowrap">
          Turn your daily chaos into calm productivity.
        </p>

        <div className="flex flex-row gap-4 sm:flex-row z-10">
          <Button
            variant="noShadow"
            onClick={() => {
              if (user) {
                nav("/dashboard");
              } else {
                nav("/authenticate");
              }
            }}
          >
            <ArrowRight />
            Get Started
          </Button>
          <a href="https://youtu.be/QIm80i_GbEE" target="_blank">
            <Button variant="oppositeNoShadow">
              <Play />
              Watch Demo
            </Button>
          </a>
        </div>
      </div>

      <div className="w-screen ">
        <Marquee items={marqueeText as string[]} />
      </div>
    </div>
  );
};
