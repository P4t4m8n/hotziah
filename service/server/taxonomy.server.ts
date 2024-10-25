import { prisma } from "@/prisma/prismaClient";
import { handleError } from "./util/error.util";
import { ITaxonomy, TTaxonomyName } from "../models/taxonomy.model";

export const getTaxonomies = async (filter: {
  name?: TTaxonomyName;
  take?: number;
  page?: number;
}): Promise<ITaxonomy[]> => {
  try {
    const taxonomies = await prisma.taxonomy.findMany({
      where: filter.name ? { name: filter.name } : undefined,
      take: filter.take,
      skip: filter.page ? (filter.page - 1) * (filter.take || 10) : undefined,
    });

    return taxonomies;
  } catch (error) {
    handleError(error, " Error in getTaxonomies in server");
    return [];
  }
};

export const saveTaxonomy = async (taxonomy: ITaxonomy): Promise<ITaxonomy> => {
  try {
    const savedTaxonomy = await prisma.taxonomy.create({
      data: taxonomy,
    });

    return savedTaxonomy;
  } catch (error) {
    const err = handleError(error, " Error in saveTaxonomy in server");
    throw err;
  }
};
