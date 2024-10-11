"use server";

import { ObjectId } from "mongodb";
import {
  ITherapist,
  ITherapistDto,
  ITherapistFilter,
} from "../models/therapists.model";
import { IModelConfig } from "../models/server.model";

const _toDTO = (therapist: ITherapist): ITherapistDto => {
  const { _id, user, ...rest } = therapist;
  return {
    ...rest,
    userId: new ObjectId(user._id),
    _id: _id ? new ObjectId(_id) : undefined,
  };
};

const _buildPipeline = (filter: ITherapistFilter) => {
  const pipeline = [];

  if (filter.fullName) {
    pipeline.push({ $regex: { title: filter.fullName } });
  }
  if (filter.subjects) {
    pipeline.push({ $match: { subjects: { $in: filter.subjects } } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }
  if (filter.languages) {
    pipeline.push({ $match: { languages: { $in: filter.languages } } });
  }

  if (filter.meetingType) {
    pipeline.push({ $match: { meetingType: { $in: filter.meetingType } } });
  }

  if (filter.gender) {
    pipeline.push({ $match: { gender: filter.gender } });
  }

  if (filter.city) {
    pipeline.push({ $match: { "address.city": filter.city } });
  }

  if (filter.education) {
    pipeline.push({ $match: { education: filter.education } });
  }

  const authorPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const project = {
    $project: {
      _id: { $toString: "$_id" },
      subjects: 1,
      languages: 1,
      meetingType: 1,
      gender: 1,
      address: 1,
      fullName: 1,
      eduction: 1,
      user: {
        _id: { $toString: "$user._id" },
        username: "$user.username",
        imgUrl: "$user.imgUrl",
      },
    },
  };

  pipeline.push(...authorPipeline);
  pipeline.push(project);

  return pipeline;
};

export const therapistConfig:IModelConfig<ITherapist,ITherapistDto,ITherapistFilter> = {
  collectionName: "therapists",
  toDTO: _toDTO,
  buildPipeline: _buildPipeline,
};
