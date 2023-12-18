import { cn } from "@/lib/utils";
import { CATEGORY } from "@prisma/client";

interface BadgeProps {
  category: CATEGORY;
  classes?: string;
}

export const Badge = ({ category, classes }: BadgeProps) => {
  switch (category) {
    case CATEGORY.LOW:
      return (
        <span
          className={cn(
            "border-2 border-green-200 bg-green-200 text-green-500 rounded-full px-3 py-1 text-xs",
            classes
          )}
        >
          Low
        </span>
      );
    case CATEGORY.MEDIUM:
      return (
        <span
          className={cn(
            "border-2 border-orange-200 bg-orange-200 text-orange-500 rounded-full px-3 py-1 text-xs",
            classes
          )}
        >
          Med
        </span>
      );
    case CATEGORY.HIGH:
      return (
        <span
          className={cn(
            "border-2 border-red-200 bg-red-200 text-red-500 rounded-full px-3 py-1 text-xs",
            classes
          )}
        >
          High
        </span>
      );
    case CATEGORY.NONE:
      return (
        <span
          className={cn(
            "border-2 border-neutral-200 bg-neutral-200 text-neutral-500 rounded-full px-3 py-1 text-xs",
            classes
          )}
        >
          None
        </span>
      );
  }
};
