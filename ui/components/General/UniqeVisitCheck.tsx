"use client";

import { apiClientService } from "@/service/client/api.client";
import { useUser } from "@/ui/hooks/useUser";
import { useEffect } from "react";

interface Props {
  itemId: string;
  route: string;
}
export default function UniqueVisitCheck({ itemId, route }: Props) {
  console.log("itemId:", itemId);
  const user = useUser().user;

  useEffect(() => {
    updateUniqueVisit();
  }, [itemId]);

  const updateUniqueVisit = async () => {
    try {
      console.log("updateUniqueVisit", itemId, route);
      await apiClientService.post(`${route}/${itemId}/updateView`, {
        userId: user?.id,
      });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return null;
}
