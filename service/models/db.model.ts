export const TABLES = [
  "article",
  "forum",
  "user",
  "therapist",
  "questionnaire",
  "post",
] as const;

export type TTableName = (typeof TABLES)[number];

export interface ISelectSql {
  id: boolean;
}

export interface IWhereSql {
  where: {
    id?: string;
  };
}


export interface IServiceConfig<T, DTO, SelectSql, SmallSelectSql> {
  collectionName: TTableName;
  toDTO: (entity: T) => DTO;
  buildSql: () => SelectSql;
  buildSmallSql?: () => SmallSelectSql;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEmptyEntity?: (...args: any[]) => T;
}
