import { Medal } from "lucide-react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TypingAnimation } from "./_components/typing-animation";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {

  return (
    <div className="flex flex-col items-center justify-center">

      <div
        className={cn(
          "flex flex-col items-center justify-center",
          headingFont.className
        )}
      >
        <div className="mb-5 flex items-center border shadow-sm px-4 py-3 bg-amber-100 text-amber-700 rounded-full">
          <Medal className="h-6 w-6 mr-2" />
          No 1 Task Management
        </div>
        <h1 className="text-3xl md-text-6xl text-center text-neutral-800 dark:text-neutral-50 mb-4">
          Taskify helps teams move
        </h1>
        <div className="w-200px text-3xl md-text-6xl text-center text-white bg-gradient-to-r from-purple-600 to-pink-600 px-4 pb-2 pt-2.5 rounded-lg">
          {/* work forward. */}
          <TypingAnimation />
        </div>
      </div>
      <div
        className={cn(
          "text-md md:text-lg text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to home offices, the way your team works is unique -
        accomplish it all with Taskify.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Taskify for free</Link>
      </Button>
    </div>
  );
};
export default MarketingPage;
