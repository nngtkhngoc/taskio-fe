import type { ReactNode } from "react";

interface CardIconProps {
  title: string;
  desc: string;
  icon: ReactNode;
  bgColor?: string;
}

export const CardIcon = ({
  title,
  desc,
  icon,
  bgColor = "bg-red-600",
}: CardIconProps) => {
  return (
    <div
      className="rounded-lg border-2 border-black bg-white py-10 px-5 shadow-secondary-opposite relative "
      data-aos="fade-up"
    >
      <div
        className={`absolute -top-6 left-3 px-4 py-4 rounded-sm border border-2 border-black ${bgColor}`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-bold text-xl">{title}</span>
        <span className="text-sm font-medium">{desc}</span>
      </div>
    </div>
  );
};
