import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

import { ContributeGrid } from "./components/ContributeGrid";
import { Information } from "./components/Information";
import { Analytics } from "./components/Analytics";

export const Profile = () => {
  return (
    <div className="relative min-h-screen min-w-screen py-10 flex flex-col items-center justify-start gap-5">
      <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className=" z-20 w-full flex items-center justify-center flex-col  md:px-10 xl:px-60 gap-5">
        <Information />
        <Analytics />
        <ContributeGrid />{" "}
      </div>
    </div>
  );
};
