"use server";

import { ObjectId } from "mongodb";
import { getCollection } from "../db/mongo";
import {
  IQuestionnaire,
  IQuestionnaireDTO,
  IQuestionnaireFilter,
} from "../models/questionnaire.model";

export const saveQuestionnaire = async (
  questionnaire: IQuestionnaire
): Promise<IQuestionnaire> => {
  try {
    const questionnaireDTO = _questionnaireToDTO(questionnaire);
    let savedDto: IQuestionnaireDTO;
    if (questionnaire._id) {
      savedDto = await _updateQuestionnaire(questionnaireDTO);
    } else {
      savedDto = await _createQuestionnaire(questionnaireDTO);
    }
    return { ...questionnaire, _id: savedDto._id!.toString() };
  } catch (error) {
    throw new Error(
      `Error saving questionnaire: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const getQuestionnaireById = async (
  _id: string
): Promise<IQuestionnaire> => {
  try {
    const pipeline = _buildPipeline({ _id });
    const collection = await getCollection("questionnaire");
    const [questionnaire] = await collection
      .aggregate<IQuestionnaire>(pipeline)
      .toArray();

    if (!questionnaire || !questionnaire._id) {
      throw new Error("Questionnaire not found");
    }

    return questionnaire;
  } catch (error) {
    throw new Error(
      `Error getting questionnaire: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const getQuestionnaires = async (
  filter: IQuestionnaireFilter
): Promise<IQuestionnaire[]> => {
  try {
    const collection = await getCollection("questionnaire");
    const pipeline = _buildPipeline(filter);
    const questionnaires = await collection
      .aggregate<IQuestionnaire>(pipeline)
      .toArray();

    return questionnaires;
  } catch (error) {
    throw new Error(
      `Error getting questionnaires: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

//Private functions
const _createQuestionnaire = async (
  questionnaire: IQuestionnaireDTO
): Promise<IQuestionnaireDTO> => {
  const collocation = await getCollection("questionnaire");

  const { insertedId } = await collocation.insertOne(questionnaire);
  return { ...questionnaire, _id: insertedId };
};

const _updateQuestionnaire = async (
  questionnaire: IQuestionnaireDTO
): Promise<IQuestionnaireDTO> => {
  const collocation = await getCollection("questionnaire");

  const { upsertedId } = await collocation.updateOne(
    { _id: new ObjectId(questionnaire._id) },
    { $set: questionnaire }
  );
  if (!upsertedId) {
    throw new Error("Questionnaire not found");
  }
  return { ...questionnaire, _id: upsertedId };
};

const _questionnaireToDTO = (
  questionnaire: IQuestionnaire
): IQuestionnaireDTO => {
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
