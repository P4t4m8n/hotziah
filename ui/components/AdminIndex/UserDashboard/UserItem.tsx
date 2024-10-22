"use client";

import { IUser } from "@/service/models/user.model";
import { useModel } from "@/ui/hooks/useModel";
import { FormEvent, useRef } from "react";
import SelectSingle from "../../General/SelectSingle";
import { ISelectSingleProps } from "@/service/models/app.model";
import { apiClientService } from "@/service/client/api.client";

interface Props {
  user: IUser;
}
export default function UserItem({ user }: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  const { permission, id } = user;
  const select: ISelectSingleProps = {
    divStyle: "",
    labelStyle: "",
    inputStyle: "",
    labelText: "Change Permission",
    name: "permission",
    value: permission,
    options: ["ADMIN", "MODERATOR", "USER"],
  };

  const onUpdatePermission = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const permission = ev.currentTarget.permission.value;
      const user = await apiClientService.put(`/user/${id}/permission`, {
        permission,
    });
    console.log("user:", user)
    } catch (error) {
      console.error("Error updating permission:", error);
    }
  };

  return (
    <li
      key={user.id}
      className={`w-full  transition-all duration-300 " ${
        isModelOpen ? "min-h-24 bg-slate-100" : "min-h-10"
      }`}
    >
      <button
        onClick={() => setIsModelOpen((prev) => !prev)}
        className="grid grid-cols-5 py-2 w-full justify-start text-left hover:bg-slate-100 "
      >
        <h4>{user.id}</h4>
        <h4>{user.username}</h4>
        <h4>{user.email}</h4>
        <h4>{user.permission}</h4>
        <h4>{user.isTherapist ? "Yes" : "No"}</h4>
      </button>
      {isModelOpen && (
        <div className="grid grid-cols-5 py-2 w-full justify-start text-left">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <div>
            <form onChange={onUpdatePermission}>
              <SelectSingle selectProps={select} />
            </form>
          </div>
        </div>
      )}
    </li>
  );
}
