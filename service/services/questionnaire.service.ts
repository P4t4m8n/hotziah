import { ObjectId } from "mongodb";
import {
  IQuestionnaire,
  IQuestionnaireDto,
  IQuestionnaireFilter,
} from "../models/questionnaire.model";
import { IModelConfig } from "../models/server.model";

const toDTO = (questionnaire: IQuestionnaire): IQuestionnaireDto => {
  const { _id, author, ...rest } = questionnaire;
  return {
    ...rest,
    authorId: new ObjectId(author._id),
    _id: _id ? new ObjectId(_id) : undefined,
  };
};

const buildPipeline = (filter: IQuestionnaireFilter) => {
  const pipeline = [];
  if (filter.title) {
    pipeline.push({ $match: { title: filter.title } });
  }
  if (filter.subjects) {
    pipeline.push({ $match: { subjects: { $in: filter.subjects } } });
  }
  if (filter.authorName) {
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    });
    pipeline.push({
      $match: { "author.name": filter.authorName },
    });
  }
  if (filter.createdAfter) {
    pipeline.push({
      $match: { createdAt: { $gte: filter.createdAfter } },
    });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  const authorPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const project = {
    $project: {
      _id: { $toString: "$_id" },
      subjects: 1,
      title: 1,
      description: 1,
      question: 1,
      author: {
        _id: { $toString: "$author._id" },
        username: "$author.username",
        imgUrl: "$author.imgUrl",
      },
    },
  };

  pipeline.push(...authorPipeline);
  pipeline.push(project);

  return pipeline;
};

export const questionnaireConfig: IModelConfig<
  IQuestionnaire,
  IQuestionnaireDto,
  IQuestionnaireFilter
> = {
  collectionName: "questionnaires",
  toDTO: toDTO,
  buildPipeline: buildPipeline,
};

export const questionnaireService = {
  toDTO,
  buildPipeline,
};
