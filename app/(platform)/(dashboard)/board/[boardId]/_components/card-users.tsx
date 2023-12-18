import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";

interface CardUsersProps {
  id: string;
}

export const CardUsers = ({ id }: CardUsersProps) => {
  let users;
  let images;

  const queryClient = useQueryClient();

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });
  users = auditLogsData;
  images = users?.map((user) => user.userImage);

  const uniqueList = new Set(images);
  images = Array.from(uniqueList);

  queryClient.invalidateQueries({
    queryKey: ["card-logs", id],
  });

  return (
    <div className="flex -space-x-2 mt-2">
      {users ? (
        images.map((img) => (
          <div key={img} className="w-6 h-6 relative border-white border-2 rounded-full">
            <Image src={img} alt="avatar" fill className="rounded-full" />
          </div>
        ))
      ) : (
        <div className="flex -space-x-2">
          <Skeleton className="w-6 h-6 rounded-full border-2 border-white bg-neutral-200" />
          <Skeleton className="w-6 h-6 rounded-full border-2 border-white bg-neutral-200" />
          <Skeleton className="w-6 h-6 rounded-full border-2 border-white bg-neutral-200" />
        </div>
      )}
    </div>
  );
};
