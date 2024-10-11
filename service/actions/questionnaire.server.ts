"use server";

import { ObjectId } from "mongodb";
import { getCollection } from "../db/mongo";
import {
  IQuestionnaire,
  IQuestionnaireDto,
  IQuestionnaireFilter,
} from "../models/questionnaire.model";
import { loggerService } from "../util/logger.util";
import { IModelConfig } from "../models/server.model";

export const saveQuestionnaire = async (
  questionnaire: IQuestionnaire
): Promise<IQuestionnaire> => {
  try {
    const questionnaireDTO = _toDTO(questionnaire);
    let savedDto: IQuestionnaireDto;
    if (questionnaire._id) {
      savedDto = await _updateQuestionnaire(questionnaireDTO);
    } else {
      savedDto = await _createQuestionnaire(questionnaireDTO);
    }
    return { ...questionnaire, _id: savedDto._id!.toString() };
  } catch (error) {
    throw _handleError(error, "Error saving questionnaire");
  }
};

export const getQuestionnaireById = async (
  _id: string
): Promise<IQuestionnaire> => {
  try {
    const pipeline = _buildPipeline({ _id });
    const collection = await getCollection("questionnaires");
    const [questionnaire] = await collection
      .aggregate<IQuestionnaire>(pipeline)
      .toArray();

    if (!questionnaire || !questionnaire._id) {
      throw new Error("Questionnaire not found");
    }

    return questionnaire;
  } catch (error) {
    throw _handleError(error, "Error getting questionnaire by id");
  }
};

export const getQuestionnaires = async (
  filter: IQuestionnaireFilter
): Promise<IQuestionnaire[]> => {
  try {
    const collection = await getCollection("questionnaires");
    const pipeline = _buildPipeline(filter);
    const questionnaires = await collection
      .aggregate<IQuestionnaire>(pipeline)
      .toArray();

    return questionnaires;
  } catch (error) {
    throw _handleError(error, "Error getting questionnaires");
  }
};

export const removeQuestionnaire = async (_id: string): Promise<void> => {
  try {
    const collocation = await getCollection("questionnaires");
    const { deletedCount } = await collocation.deleteOne({
      _id: new ObjectId(_id),
    });
    if (deletedCount === 0) {
      throw new Error("Questionnaire not found");
    }
  } catch (error) {
    throw _handleError(error, "Error removing questionnaire");
  }
};

//Private functions
const _createQuestionnaire = async (
  questionnaire: IQuestionnaireDto
): Promise<IQuestionnaireDto> => {
  const collocation = await getCollection("questionnaires");
  const { insertedId } = await collocation.insertOne(questionnaire);
  return { ...questionnaire, _id: insertedId };
};

const _updateQuestionnaire = async (
  questionnaire: IQuestionnaireDto
): Promise<IQuestionnaireDto> => {
  const collocation = await getCollection("questionnaires");

  const { upsertedId } = await collocation.updateOne(
    { _id: questionnaire._id },
    { $set: questionnaire }
  );
  if (!upsertedId) {
    throw new Error("Questionnaire not found");
  }
  return { ...questionnaire, _id: upsertedId };
};

const _toDTO = (questionnaire: IQuestionnaire): IQuestionnaireDto => {
  const { _id, author, ...rest } = questionnaire;
  return {
    ...rest,
    authorId: new ObjectId(author._id),
    _id: _id ? new ObjectId(_id) : undefined,
  };
};

const _buildPipeline = (filter: IQuestionnaireFilter) => {
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

const _handleError = (error: unknown, errorStr: string) => {
  loggerService.error(errorStr, error as Error);
  return new Error(
    `Error saving questionnaire: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
};

export const questionnaireConfig: IModelConfig<
  IQuestionnaire,
  IQuestionnaireDto,
  IQuestionnaireFilter
> = {
  collectionName: "questionnaires",
  toDTO: _toDTO,
  buildPipeline: _buildPipeline,
};
