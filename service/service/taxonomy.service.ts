import { ITaxonomy, TTaxonomyName } from "../models/taxonomy.model";

const transformTaxonomy = (
  data: ITaxonomy[]
): Record<TTaxonomyName, string[]> => {
  return data.reduce((acc, tax) => {
    acc[tax.name as TTaxonomyName] = tax.enums;
    return acc;
  }, {} as Record<TTaxonomyName, string[]>);
};

export const taxonomyService = {
   transformTaxonomy,
};
