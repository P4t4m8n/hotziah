"use client";

import {
  ICheckBoxProps,
  IInputProps,
  ISelectSingleProps,
} from "@/service/models/app.model";
import { IUserFilter } from "@/service/models/user.model";
import Input from "../../General/Input";
import CheckBox from "../../General/CheckBox";
import SelectSingle from "../../General/SelectSingle";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { Permission } from "@prisma/client";
import FormBtn from "../../General/FormBtn";

export default function UserFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter: IUserFilter = {
    username: searchParams.get("username") || undefined,
    permission: (searchParams.get("permission") as Permission) || undefined,
    id: searchParams.get("id") || undefined,
    email: searchParams.get("email") || undefined,
    page: searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : undefined,
    take: searchParams.get("take")
      ? parseInt(searchParams.get("amount")!)
      : undefined,
    isTherapist: searchParams.get("isTherapist")
      ? searchParams.get("isTherapist") === "true"
      : undefined,
    firstName: searchParams.get("firstName") || undefined,
    lastName: searchParams.get("lastName") || undefined,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    router.push(`/admin/user?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/admin/dashboard");
  };

  const inputs: IInputProps[] = [
    {
      divStyle: "",
      labelStyle: "",
      inputStyle: "border border-black",
      labelText: "Username",
      name: "username",
      value: filter.username,
      placeholder: "",
      required: false,
    },
    {
      divStyle: "",
      labelStyle: "",
      inputStyle: "border border-black",
      labelText: "Email",
      name: "email",
      value: filter.email,
      placeholder: "",
      required: false,
    },
    {
      divStyle: "",
      labelStyle: "",
      inputStyle: "border border-black",
      labelText: "First Name",
      name: "firstName",
      value: filter.firstName,
      placeholder: "",
      required: false,
    },
    {
      divStyle: "",
      labelStyle: "",
      inputStyle: "border border-black",
      labelText: "Last Name",
      name: "lastName",
      value: filter.lastName,
      placeholder: "",
      required: false,
    },
  ];

  const checkBox: ICheckBoxProps = {
    divStyle: "",
    labelStyle: "",
    inputStyle: "",
    labelText: "Is Therapist",
    name: "isTherapist",
    value: filter.isTherapist,
  };

  const select: ISelectSingleProps = {
    divStyle: "",
    labelStyle: "",
    inputStyle: "",
    labelText: "Permission",
    name: "permission",
    value: filter.permission,
    options: ["ADMIN", "MODERATOR", "USER"],
  };

  const formBtn = {
    cancelAction: clearFilters,
    containerStyle: "flex gap-4",
    cancelBtnStyle: " bg-red-500 text-white p-2",
    submitBtnStyle: " bg-red-500 text-white p-2",
    cancelText: "CLEAR",
    submitText: "SEARCH",
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className=" flex">
        {inputs.map((input, idx) => (
          <Input inputProps={input} key={idx} />
        ))}
      </ul>

      <div className="">
        <SelectSingle selectProps={select} />
        <CheckBox checkBoxProps={checkBox} />
      </div>
      <FormBtn {...formBtn} />
    </form>
  );
}
