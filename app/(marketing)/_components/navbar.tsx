import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="bg-white dark:bg-neutral-950 fixed top-0 w-full h-14 px-4 border-b shadow-sm flex items-center">
      <div className="max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-2 md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <div className="flex gap-2">
            <Button size="sm" asChild>
              <Link href="/sign-up">Get Taskify for Free</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
