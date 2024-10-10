import { MongoClient, Db, Collection } from "mongodb";
import { TCollectionName } from "../models/db.model";

let dbConnection: Db | null = null;

export const getCollection = async (
  collectionName: TCollectionName
): Promise<Collection> => {
  const db = await _connect();
  return db.collection(collectionName);
};

const _connect = async (): Promise<Db> => {
  if (dbConnection) {
    return dbConnection;
  }

  const client = await MongoClient.connect("mongodb://localhost:27017");
  dbConnection = client.db("hotziah");
  return dbConnection;
};
