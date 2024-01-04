import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition image-center gap-x-2 hidden md:flex items-center">
        <div>
          <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        </div>
        <p
          className={cn("text-lg text-neutral-700 dark:text-neutral-50 pt-1", headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};
