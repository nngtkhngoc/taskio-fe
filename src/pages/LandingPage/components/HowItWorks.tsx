import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

interface Step {
  step: string;
  description: string;
}

export const HowItWorks = () => {
  const steps = [
    {
      step: "Create Your Workspace",
      description:
        "Set up your personal or team space in seconds — no clutter, just clarity.",
    },
    {
      step: "Add Tasks & Goals",
      description:
        "Break down big projects into tasks with deadlines, priorities, and categories.",
    },
    {
      step: "Track & Organize",
      description:
        "Stay on top with boards, lists, or calendars — switch views as you like.",
    },
    {
      step: "Achieve & Reflect",
      description:
        "Complete tasks, unlock insights, and celebrate progress every step of the way.",
    },
  ];

  const renderSteps = (steps: Step[]) => {
    return steps.map((s, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center text-center relative"
      >
        {/* Step number circle */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold mb-3">
          {idx + 1}
        </div>

        {/* Content */}
        <span className="font-bold text-lg">{s.step}</span>
        <span className="text-sm text-zinc-700 max-w-[200px]">
          {s.description}
        </span>

        {/* Connector line */}
        {idx < steps.length - 1 && (
          <div className="hidden md:block absolute top-5 left-full w-20 h-[2px] bg-black"></div>
        )}
      </div>
    ));
  };

  return (
    <div
      className="relative flex flex-col gap-6 items-center justify-center py-30 px-5"
      data-aos
    >
      <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      {/* Section label */}
      <div
        data-aos="fade-down"
        className="px-3 py-1 border-2 border-black rounded-sm shadow-secondary text-[10px] font-medium"
      >
        Get started in 4 easy steps
      </div>

      {/* Heading */}
      <h5 data-aos="zoom-in" className="text-3xl font-bold">
        How It Works
      </h5>

      {/* Description */}
      <p
        data-aos="fade-up"
        className="text-[12px] sm:text-sm text-center text-zinc-600 max-w-md"
      >
        From setting up your workspace to celebrating milestones, Taskio guides
        you through a simple and effective flow that keeps productivity
        effortless.
      </p>

      {/* Steps */}
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 w-full max-w-4xl mt-6"
        data-aos="fade-up"
      >
        {renderSteps(steps)}
      </div>

      <div className="absolute inset-x-0 -bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};
