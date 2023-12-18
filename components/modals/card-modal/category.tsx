"use client";

import { updateCard } from "@/actions/update-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAction } from "@/hooks/use-action";
import { cn } from "@/lib/utils";
import { CardWithList } from "@/types";
import { CATEGORY } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { CircleDot } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./badge";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryProps {
  data: CardWithList;
}

export const Category = ({ data }: CategoryProps) => {
  const queryClient = useQueryClient();

  const params = useParams();

  const [category, setCategory] = useState<CATEGORY>(data.category);

  const { execute, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["card-users", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Category changed to "${data.category}"`);
      setCategory(data.category);
    },
  });

  const onClickHandle = (categoryInput: CATEGORY) => {
    const boardId = params.boardId as string;

    if (categoryInput === data.category) {
      return;
    }

    execute({
      boardId,
      category: categoryInput,
      id: data.id,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <CircleDot className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Category</p>
        <div className="flex w-full font-semibold gap-3">
          <button
            className={
              category === CATEGORY.LOW ? "scale-110 opacity-100" : "opacity-50"
            }
            onClick={() => onClickHandle(CATEGORY.LOW)}
            disabled={isLoading}
          >
            <Badge category={CATEGORY.LOW} />
          </button>
          <button
            className={
              category === CATEGORY.MEDIUM
                ? "scale-110 opacity-100"
                : "opacity-50"
            }
            onClick={() => onClickHandle(CATEGORY.MEDIUM)}
            disabled={isLoading}
          >
            <Badge category={CATEGORY.MEDIUM} />
          </button>
          <button
            className={
              category === CATEGORY.HIGH
                ? "scale-110 opacity-100"
                : "opacity-50"
            }
            onClick={() => onClickHandle(CATEGORY.HIGH)}
            disabled={isLoading}
          >
            <Badge category={CATEGORY.HIGH} />
          </button>
          <button
            className={
              category === CATEGORY.NONE
                ? "scale-110 opacity-100"
                : "opacity-50"
            }
            onClick={() => onClickHandle(CATEGORY.NONE)}
            disabled={isLoading}
          >
            <Badge category={CATEGORY.NONE} />
          </button>
        </div>
      </div>
    </div>
  );
};

Category.Skeleton = function CategorySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-20 h-6 mb-2 bg-neutral-200" />
        <div className="flex gap-3">
          <Skeleton className="w-10 h-6 bg-neutral-200" />
          <Skeleton className="w-10 h-6 bg-neutral-200" />
          <Skeleton className="w-10 h-6 bg-neutral-200" />
          <Skeleton className="w-10 h-6 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};
