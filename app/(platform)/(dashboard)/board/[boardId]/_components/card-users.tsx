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

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-users", id],
    queryFn: () => fetcher(`/api/cards/${id}/users`),
  });
  users = auditLogsData;

  const uniqueList = new Set();
  const distinctObjects = users?.filter((obj) => {
    if (!uniqueList.has(obj.userId)) {
      uniqueList.add(obj.userId);
      return true;
    }
    return false;
  });

  images = distinctObjects?.map((obj) => obj.userImage);

  return (
    <div className="flex -space-x-2 mt-2">
      {users ? (
        images?.map((img, idx) => (
          <div
            key={img}
            className={`z-${
              (images.length - idx) * 10
            } w-6 h-6 relative border-white border-2 rounded-full`}
          >
            <Image src={img} alt="avatar" fill className="rounded-full" />
          </div>
        ))
      ) : (
        <div className="flex -space-x-2">
          <Skeleton className="z-30 w-6 h-6 rounded-full border-2 border-white bg-neutral-200" />
          <Skeleton className="z-20 w-6 h-6 rounded-full border-2 border-white bg-neutral-200" />
          <Skeleton className="z-10 w-6 h-6 rounded-full border-2 border-white bg-neutral-200" />
        </div>
      )}
    </div>
  );
};
