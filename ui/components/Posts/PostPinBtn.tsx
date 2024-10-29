"use client";

import { apiClientService } from "@/service/client/api.client";
import { PinnedFullSvg, PinnedSvg } from "@/ui/Icons/Svgs";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface Props {
  postId: string;
  forumId: string;
  isPinned?: boolean;
}
export default function PostPinBtn({ postId, isPinned, forumId }: Props) {
  const router = useRouter();
  const togglePin = async (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await apiClientService.post(`post/${postId}/pin`, {
        isPinned: !isPinned,
      });

      router.push(`/forum/${forumId}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button onClick={togglePin} className="pl-2 bg-red-500">
      {isPinned ? <PinnedFullSvg /> : <PinnedSvg />}
    </button>
  );
}
