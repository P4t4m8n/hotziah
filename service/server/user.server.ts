import { ObjectId } from "mongodb";
import { getCollection } from "../db/mongo";
import { IUser, IUserDto, IUserFIlter } from "../models/user.model";
import { handleError } from "../util/error.util";

const query = async (filter: IUserFIlter): Promise<IUser[]> => {
  const collection = await getCollection("users");
  const pipeline = buildPipeline(filter);
  const users = await collection.aggregate<IUser>(pipeline).toArray();
  return users;
};

const get = async (filter: IUserFIlter): Promise<IUser> => {
  const collection = await getCollection("users");
  const pipeline = buildPipeline(filter);
  const [user] = await collection.aggregate<IUser>(pipeline).toArray();
  return user;
};

const create = async (dto: IUserDto): Promise<IUser> => {
  const collection = await getCollection("users");
  const { insertedId } = await collection.insertOne(dto);
  delete dto.password;
  return { ...dto, _id: insertedId.toString() };
};

const update = async (dto: IUserDto): Promise<IUser> => {
  const collection = await getCollection("users");
  const { _id, ...rest } = dto;
  const { acknowledged } = await collection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: rest }
  );
  if (!acknowledged) {
    throw handleError(new Error("Entity not found"), "Error updating entity");
  }

  delete dto.password;
  return { ...dto, _id: dto._id?.toString() };
};
const remove = async (id: string): Promise<void> => {
  const collection = await getCollection("users");
  const { deletedCount } = await collection.deleteOne({
    _id: new ObjectId(id),
  });
  if (deletedCount === 0) {
    throw handleError(new Error("Entity not found"), "Error removing entity");
  }
};

const toDTO = (user: IUser): IUserDto => {
  const { _id, ...rest } = user;
  return {
    ...rest,
    _id: new ObjectId(_id),
  };
};

const buildPipeline = (filter: IUserFIlter) => {
  const pipeline = [];

  if (filter.username) {
    pipeline.push({ $match: { username: filter.username } });
  }

  if (filter.providerId) {
    pipeline.push({ $match: { providerId: filter.providerId } });
  }

  if (filter.provider) {
    pipeline.push({ $match: { provider: filter.provider } });
  }

  if (filter.permission) {
    pipeline.push({ $match: { permission: filter.permission } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  const project = {
    $project: {
      _id: { $toString: "$_id" },
      username: 1,
      imgUrl: 1,
      permission: 1,
      providerId: 1,
    },
  };
  pipeline.push(project);

  return pipeline;
};

export const userServer = {
  query,
  get,
  create,
  update,
  remove,
  toDTO,
  buildPipeline,
};
