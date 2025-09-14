import { CardIcon } from "@/components/common/CardIcon";

import { ChartArea, CheckCircle, Cloud, Sliders } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

export const KeyFeatures = () => {
  const features = [
    {
      name: "Smart Task Management",
      description:
        "Organize tasks with priority levels, due dates, and categories so nothing slips through the cracks.",
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      bgColor: "bg-red-600",
    },
    {
      name: "Analytics & Insights",
      description:
        "Visualize progress, identify bottlenecks, and celebrate milestones with intuitive reports and charts.",
      icon: <ChartArea className="w-5 h-5 text-white" />,
      bgColor: "bg-yellow-500",
    },
    {
      name: "Custom Workflows",
      description:
        "Adapt Taskio to your style with drag-and-drop boards, custom tags, and flexible views.",
      icon: <Sliders className="w-5 h-5 text-white" />,
      bgColor: "bg-green-500",
    },
    {
      name: "Seamless Sync",
      description:
        "Access your tasks anywhere — all updates sync instantly across devices.",
      icon: <Cloud className="w-5 h-5 text-white" />,
      bgColor: "bg-blue-500",
    },
  ];

  const renderFeatures = (features: Feature[]) => {
    return features.map((feature) => (
      <CardIcon
        key={feature.name}
        title={feature.name}
        desc={feature.description}
        icon={feature.icon}
        bgColor={feature.bgColor}
      />
    ));
  };

  return (
    <div className="bg-blue-100 flex flex-col gap-6 items-center justify-center pt-12 pb-30 px-5 relative">
      <div className="absolute inset-x-0 -bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Section label */}
      <div
        className="px-3 py-1 border-2 border-black bg-white rounded-sm shadow-secondary text-[10px] font-medium"
        data-aos="fade-down"
      >
        Why choose Taskio?
      </div>

      {/* Heading */}
      <h5 className="text-3xl font-bold" data-aos="zoom-in">
        Key Features
      </h5>

      {/* Description */}
      <p
        className="text-[12px] sm:text-sm text-center text-zinc-600 max-w-md"
        data-aos="fade-up"
      >
        Discover the tools designed to turn your messy to-do list into a clear
        action plan.
      </p>

      {/* Features grid */}
      <div className="grid gap-10 sm:grid-cols-2 mt-8 w-full max-w-6xl px-5 md:px-20 lg:px-40 xl:px-60 md:grid-cols-2 md:grid-rows-2">
        {renderFeatures(features)}
      </div>
    </div>
  );
};
