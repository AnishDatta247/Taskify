"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import { X } from "lucide-react";
import { FormSubmit } from "./form-submit";
import React, { ElementRef, useRef } from "react";
import { FormInput } from "./form-input";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

interface FormModalProps {
  children: React.ReactNode;
}

export const FormModal = ({ children }: FormModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const proModal = useProModal();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-80 pt-3">
        <div className="text-sm font-medium text-center text-neutral-600 dark:text-neutral-50 pb-4">
          Create Board
        </div>
        <DialogClose asChild ref={closeRef}>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};
