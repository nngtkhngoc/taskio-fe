import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { ComicText } from "@/components/ui/comic-text";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const AuthTab = () => {
  return (
    <div className="w-9/10  py-3 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-3 px-4">
        <span className="text-md font-bold">Welcome to </span>{" "}
        <div className="-mt-1 ">
          <ComicText
            fontSize={2.5}
            backgroundColor="var(--color-blue-300)"
            dotColor="white"
          >
            TASKIO!
          </ComicText>
        </div>
        <p className="text-[12px] text-gray-700 text-center mt-2 ">
          Join us now!
        </p>
      </div>
      <Tabs defaultValue="signin" className="max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <SignIn />
        </TabsContent>

        <TabsContent value="signup">
          <SignUp />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};
