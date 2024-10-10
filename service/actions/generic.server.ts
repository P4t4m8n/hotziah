"use server";

import { Collection, ObjectId } from "mongodb";
import { getCollection } from "../db/mongo";
import modelConfigs from "./modelConfig";
import { loggerService } from "../util/logger.util";
import { TCollectionName } from "../models/db.model";
import { ModelConfig } from "../models/server.model";
import { IDto, IFilter } from "../models/app.model";



export const saveEntity = async <T extends { _id: string }, DTO extends IDto>(
  entity: T,
  key: TCollectionName
): Promise<T> => {
  try {
    const config = modelConfigs[key] as ModelConfig<T, DTO, IFilter>;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const collection = await getCollection(config.collectionName);
    const dto = config.toDTO(entity);

    let savedDto: DTO;
    const entityId = (entity as T)._id;
    if (entityId) {
      savedDto = await _updateEntity(collection, dto);
    } else {
      savedDto = await _createEntity(collection, dto);
    }
    return { ...entity, _id: savedDto._id!.toString() };
  } catch (error) {
    throw _handleError(error, `Error saving entity of type ${key}`);
  }
};

export const getEntityById = async <T extends { _id: string }, Filter>(
  _id: string,
  key: TCollectionName
): Promise<T> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = modelConfigs[key] as ModelConfig<T, any, Filter>;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const filter = { _id } as Filter;
    const pipeline = config.buildPipeline(filter);
    const collection = await getCollection(config.collectionName);
    const [entity] = await collection.aggregate<T>(pipeline).toArray();

    if (!entity || !entity._id) {
      throw new Error("Entity not found");
    }

    return entity;
  } catch (error) {
    throw _handleError(error, `Error getting entity by ID of type ${key}`);
  }
};

export const getEntities = async <T extends { _id: string }, Filter>(
  filter: Filter,
  key: TCollectionName
): Promise<T[]> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = modelConfigs[key] as ModelConfig<T, any, Filter>;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const pipeline = config.buildPipeline(filter);
    const collection = await getCollection(config.collectionName);
    const entities = await collection.aggregate<T>(pipeline).toArray();

    return entities;
  } catch (error) {
    throw _handleError(error, `Error getting entities of type ${key}`);
  }
};

export const removeEntity = async (
  _id: string,
  key: TCollectionName
): Promise<void> => {
  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    const collection = await getCollection(config.collectionName);
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(_id),
    });
    if (deletedCount === 0) {
      throw new Error("Entity not found");
    }
  } catch (error) {
    throw _handleError(error, `Error removing entity of type ${key}`);
  }
};

//Private functions
const _createEntity = async <DTO extends IDto>(
  collection: Collection,
  dto: DTO
): Promise<DTO> => {
  const { insertedId } = await collection.insertOne(dto);
  if (!insertedId) {
    throw new Error("Entity not created");
  }
  return { ...dto, _id: insertedId } as DTO;
};

const _updateEntity = async <DTO extends IDto>(
  collection: Collection,
  dto: IDto
): Promise<DTO> => {
  const objectId = new ObjectId(dto._id);
  const { upsertedId } = await collection.updateOne(
    { _id: objectId },
    { $set: dto }
  );
  if (!upsertedId) {
    throw new Error("Entity not found");
  }
  return { ...dto, _id: upsertedId } as DTO;
};

const _handleError = (error: unknown, errorStr: string) => {
    loggerService.error(errorStr, error as Error);
    return new Error(
      `${errorStr}: ${error instanceof Error ? error.message : String(error)}`
    );
  };
