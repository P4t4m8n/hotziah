"use client";

import { likeClientService } from "@/service/client/like.client";
import { ILike } from "@/service/models/like.model";
import { useUser } from "@/ui/hooks/useUser";
import { LikeSvg, LikeSvgFilled } from "@/ui/Icons/Svgs";
import { MouseEvent, useRef, useState } from "react";

interface Props {
  like: Omit<ILike, "user">;
  numOfLikes: number;
}

export default function LikeBtn({ like, numOfLikes }: Props) {
  const getCurrentUserNoRender = useUser().getCurrentUserNoRender;
  const [likeState, setLikeState] = useState<Partial<ILike> | null>(like);
  console.log("likeState:", likeState)
  const numOfLikesRef = useRef(numOfLikes);

  const onLike = async (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    try {
      if (likeState?.id) {
        await likeClientService.remove(likeState.id);
        numOfLikesRef.current--;
        setLikeState(null);
        return;
      }

      const user = getCurrentUserNoRender();
      if (!user) {
        alert("You must be logged in to like");
      }
      const savedLike = await likeClientService.create(user!.id!, like);
      numOfLikesRef.current++;
      setLikeState(savedLike);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={onLike}
      className={
        "flex border  px-3 items-center justify-center gap-2 w-16  rounded-[5rem]" +
        (likeState?.id ? " border-green-700" : " text-slate-200")
      }
    >
      <span className="text-xs font-semibold">{numOfLikesRef.current}</span>
      {likeState?.id ? <LikeSvgFilled /> : <LikeSvg />}
    </button>
  );
}
