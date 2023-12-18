"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";
import { ListWithCards } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ListHeaderProps {
  data: ListWithCards;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="px-2 pt-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex-1 px-[2px] py-[2px]"
        >
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            className="text-base px-[7px] py-1 h-7 font-semibold border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white rounded-sm"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="flex items-center mt-0.5 w-full text-base px-2.5 py-1 h-7 font-semibold border-transparent"
        >
          <span>{title}</span>
          <Badge className="bg-neutral-300 w-4 h-4 p-0 ml-2 mt-0.5 hover:bg-neutral-300">
            <span className="font-normal text-[10px] text-neutral-700 w-full text-center">
              {data.cards.length}
            </span>
          </Badge>
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};
