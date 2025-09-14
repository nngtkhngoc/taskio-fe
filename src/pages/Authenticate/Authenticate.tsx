import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { AuthTab } from "./components/AuthTab";

import login from "@/assets/login.png";
import { Link } from "react-router";

export const Authenticate = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen py-5 ">
      <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 w-9/10 xl:w-3/5 bg-white border-2 border-black rounded-xl shadow-secondary-opposite">
        <div className="flex justify-center items-center">
          <AuthTab />
        </div>
        <div className="bg-muted relative hidden md:block min-h-[600px] rounded-r-xl overflow-hidden">
          <img
            src={login}
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>

      <span className="text-sm text-zinc-600 z-20">
        Click{" "}
        <Link to="/" className="text-blue-700 underline font-medium">
          here
        </Link>{" "}
        to go back to landing page.
      </span>
    </div>
  );
};
