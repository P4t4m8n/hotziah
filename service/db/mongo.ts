import { MongoClient, Db, Collection, Document } from "mongodb";
import { TCollectionName } from "../models/db.model";

let dbConnection: Db | null = null;

export const getCollection = async <T extends Document>(
  collectionName: TCollectionName
): Promise<Collection<T>> => {
  const db = await _connect();
  return db.collection<T>(collectionName);
};

const _connect = async (): Promise<Db> => {
  if (dbConnection) {
    return dbConnection;
  }

  const client = await MongoClient.connect("mongodb://localhost:27017");
  dbConnection = client.db("hotziah");
  return dbConnection;
};
