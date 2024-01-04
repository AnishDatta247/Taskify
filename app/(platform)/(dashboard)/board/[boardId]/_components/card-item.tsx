"use client";

import { Badge } from "@/components/modals/card-modal/badge";
import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { CATEGORY, Card } from "@prisma/client";
import { CardUsers } from "./card-users";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="mb-2 border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white dark:bg-neutral-950 rounded-md shadow-sm"
        >
          <div className="flex">
            <span className="text-base font-medium truncate">{data.title}</span>
            {data.category !== CATEGORY.NONE && (
              <Badge
                category={data.category}
                classes="px-1 py-0.5 rounded-md ml-2"
              />
            )}
          </div>
          {data.description && (
            <p className="mt-2 text-xs text-neutral-500">{data.description}</p>
          )}
          <CardUsers id={data.id} />
        </div>
      )}
    </Draggable>
  );
};
