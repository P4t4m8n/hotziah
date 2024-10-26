"use client";

import { useState } from "react";
import GeneralMenu from "../../Menus/GeneralMenu";
import { IMenuBtn, IMenuItem } from "@/service/models/menu.model";
import { TherapistStatus } from "@prisma/client";
import { apiClientService } from "@/service/client/api.client";

interface Props {
  status: string;
  therapistId: string;
}
export default function TherapistItemActionsClient({
  status,
  therapistId,
}: Props) {
  const [statusState, setStatusState] = useState(status);

  const handleStatusChange = async (status: string) => {
    console.log("status:", status)
    try {
      const x = await apiClientService.put(`therapist/${therapistId}`, {
        status,
      });
      console.log("x:", x)
      setStatusState(status);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case TherapistStatus.ACTIVE:
        return "bg-green-500 text-white";
      case TherapistStatus.INACTIVE:
        return "bg-gray-500 text-white";
      case TherapistStatus.PENDING:
        return "bg-yellow-500 text-black";
      case TherapistStatus.REJECTED:
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const menuBtn: IMenuBtn = {
    text: statusState,
    style: `p-1 rounded-lg ${getStatusStyle(statusState)}`,
  };

  const items: IMenuItem[] = Object.values(TherapistStatus).map((status) => {
    return {
      text: status,
      style:
        "border w-full p-1 rounded-md hover:bg-gray-200 transition-colors duration-200",
      onClick: () => handleStatusChange(status),
    };
  });

  const menuItems = {
    menuBtn: menuBtn,
    menuStyle:
      "gap-2 absolute z-10 bg-white shadow-2xl flex-col  p-2 rounded-xl ",
    items: items,
  };
  return (
    <div>
      <GeneralMenu menuItems={menuItems} />
    </div>
  );
}
