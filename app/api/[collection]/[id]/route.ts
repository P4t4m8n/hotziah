import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { TModelCollectionName } from "@/service/models/db.model";
import {
  getEntity,
  removeEntity,
  saveEntity,
} from "@/service/server/generic.server";
import { IDto, IFilter } from "@/service/models/app.model";
import modelConfigs from "@/service/server/modelConfig";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection: string; id: string } }
) {
  const { collection, id } = params;
  const key = collection as TModelCollectionName;

  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    const filter = { _id: id } as IFilter;

    const entity = await getEntity(filter, key);

    return NextResponse.json(entity);
  } catch (error: unknown) {
    console.error(`Error fetching entity ${id} from collection ${key}:`, error);
    return NextResponse.json(
      { error: error || "Entity not found" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { collection: string; id: string } }
) {
  const { collection, id } = params;
  const key = collection as TModelCollectionName;

  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    const data = await request.json();
    const entity = { ...data, _id: id } as IDto;

    const updatedEntity = await saveEntity(entity, key);

    return NextResponse.json(updatedEntity);
  } catch (error: unknown) {
    console.error(`Error updating entity ${id} in collection ${key}:`, error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { collection: string; id: string } }
) {
  const { collection, id } = params;
  const key = collection as TModelCollectionName;

  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    await removeEntity(id, key);

    return NextResponse.json({ message: "Entity deleted successfully" });
  } catch (error: unknown) {
    console.error(`Error deleting entity ${id} from collection ${key}:`, error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
