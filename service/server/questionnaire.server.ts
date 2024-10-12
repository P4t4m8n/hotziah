"use server";

import { ObjectId } from "mongodb";
import { getCollection } from "../db/mongo";
import {
  IQuestionnaire,
  IQuestionnaireDto,
  IQuestionnaireFilter,
} from "../models/questionnaire.model";
import { questionnaireService } from "../services/questionnaire.service";
import { handleError } from "../util/error.util";

export const saveQuestionnaire = async (
  questionnaire: IQuestionnaire
): Promise<IQuestionnaire> => {
  try {
    const questionnaireDTO = questionnaireService.toDTO(questionnaire);
    let savedDto: IQuestionnaireDto;
    if (questionnaire._id) {
      savedDto = await _updateQuestionnaire(questionnaireDTO);
    } else {
      savedDto = await _createQuestionnaire(questionnaireDTO);
    }
    return { ...questionnaire, _id: savedDto._id!.toString() };
  } catch (error) {
    throw handleError(error, "Error saving questionnaire");
  }
};

export const getQuestionnaireById = async (
  _id: string
): Promise<IQuestionnaire> => {
  try {
    const pipeline = questionnaireService.buildPipeline({ _id });
    const collection = await getCollection("questionnaires");
    const [questionnaire] = await collection
      .aggregate<IQuestionnaire>(pipeline)
      .toArray();

    if (!questionnaire || !questionnaire._id) {
      throw new Error("Questionnaire not found");
    }

    return questionnaire;
  } catch (error) {
    throw handleError(error, "Error getting questionnaire by id");
  }
};

export const getQuestionnaires = async (
  filter: IQuestionnaireFilter
): Promise<IQuestionnaire[]> => {
  try {
    const collection = await getCollection("questionnaires");
    const pipeline = questionnaireService.buildPipeline(filter);
    const questionnaires = await collection
      .aggregate<IQuestionnaire>(pipeline)
      .toArray();

    return questionnaires;
  } catch (error) {
    throw handleError(error, "Error getting questionnaires");
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
    throw handleError(error, "Error removing questionnaire");
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
