import { getEntities, saveEntity } from "@/service/server/generic.server";
import modelConfigs from "@/service/server/modelConfig";
import { IDto, IFilter } from "@/service/models/app.model";
import { TModelCollectionName } from "@/service/models/db.model";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { collection: string } }
) {
  const { collection } = params;
  const key = collection as TModelCollectionName;

  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const filter = searchParams as IFilter;

    const entities = await getEntities(filter, key);

    return NextResponse.json(entities);
  } catch (error: unknown) {
    console.error(`Error fetching entities from collection ${key}:`, error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { collection: string } }
) {
  const { collection } = params;
  const key = collection as TModelCollectionName;

  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    const data = await request.json();
    const entity = data as IDto;

    // Call saveEntity with the entity and key
    const savedEntity = await saveEntity(entity, key);

    return NextResponse.json(savedEntity, { status: 201 });
  } catch (error: unknown) {
    console.error(`Error saving entity to collection ${key}:`, error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
