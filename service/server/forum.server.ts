"use server";

import { ObjectId } from "mongodb";
import {
  IForum,
  IForumDto,
  IForumFilter,
  TForumType,
} from "../models/forum.model";
import { getCollection } from "../db/mongo";
import { handleError } from "../util/error.util";
import { saveEntity } from "./generic.server";
import { forumServerService } from "./util/forum.server.util";
import { redirect } from "next/navigation";

export const getForums = async (filter: IForumFilter): Promise<IForum[]> => {
  const collection = await getCollection<IForumDto>("forums");
  const pipeline = forumServerService.buildPipeline(filter);
  const forums = await collection.aggregate<IForum>(pipeline).toArray();
  return forums;
};

export const getForum = async (filter: IForumFilter): Promise<IForum> => {
  const collection = await getCollection<IForumDto>("forums");
  const pipeline = forumServerService.buildPipeline(filter);
  const forum = await collection.aggregate<IForum>(pipeline).next();

  if (!forum) {
    throw handleError(404, "Forum not found");
  }
  return forum;
};

export const createForum = async (forum: IForum): Promise<IForum> => {
  const collection = await getCollection<IForumDto>("forums");

  const dto = forumServerService.toDto(forum);
  const { insertedId } = await collection.insertOne(dto);
  if (!insertedId) {
    throw handleError(500, "Error creating forum");
  }
  return { ...forum, _id: insertedId.toString(), admins: [] };
};

export const updateForum = async (forum: IForum): Promise<IForum> => {
  const collection = await getCollection<IForumDto>("forums");
  const dto = forumServerService.toDto(forum);

  const { acknowledged } = await collection.updateOne(
    { _id: new ObjectId(forum._id) },
    { $set: dto }
  );

  if (!acknowledged) {
    throw handleError(404, "Forum not found");
  }

  return forum;
};

export const removeForum = async (_id: string): Promise<void> => {
  const collection = await getCollection<IForumDto>("forums");
  const { deletedCount } = await collection.deleteOne({
    _id: new ObjectId(_id),
  });

  if (deletedCount === 0) {
    throw handleError(404, "Forum not found");
  }
};

export const saveForum = async (formData: FormData) => {
  const adminIds = formData.getAll("admins") as string[];
  const admins = adminIds.map((id) => ({ _id: id }));

  const forum = {
    _id: formData.get("_id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as TForumType,
    admins,
  };
  console.log("forum:", forum);

  await saveEntity<IForum, IForumDto>(forum, "forums");
  redirect("/forum");
};
