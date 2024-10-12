import { ObjectId } from "mongodb";
import { IUser, IUserDto, IUserFIlter } from "../models/user.model";
import { IModelConfig } from "../models/server.model";

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

export const userConfig: IModelConfig<IUser, IUserDto, IUserFIlter> = {
  collectionName: "users",
  toDTO: toDTO,
  buildPipeline: buildPipeline,
};
