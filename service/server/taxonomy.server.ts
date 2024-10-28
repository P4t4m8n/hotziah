import { prisma } from "@/prisma/prismaClient";
import { handleError } from "./util/error.util";
import { ITaxonomy, TTaxonomyName } from "../models/taxonomy.model";
import { unstable_cache } from "next/cache";
import { taxonomyService } from "../service/taxonomy.service";

export const getTaxonomies = unstable_cache(
  async (filter: {
    name?: TTaxonomyName;
    take?: number;
    page?: number;
  }): Promise<Record<TTaxonomyName, string[]>> => {
    try {
      const taxonomies = await prisma.taxonomy.findMany({
        where: filter.name ? { name: filter.name } : undefined,
        take: filter.take || undefined,
        skip: filter.page ? (filter.page - 1) * (filter.take || 10) : undefined,
      });
      const taxonomyMap = taxonomyService.transformTaxonomy(taxonomies);

      return taxonomyMap;
    } catch (error) {
      handleError(error, " Error in getTaxonomies in server");
      return {
        subjects: [""],
        languages: [""],
        meetingTypes: [""],
        education: [""],
        forumType: [""],
        postTags: [""],
      };
    }
  },
  [],
  { revalidate: 60 * 1000 * 60, tags: ["taxonomies"] }
);

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
