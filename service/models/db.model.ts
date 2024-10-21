/* eslint-disable @typescript-eslint/no-explicit-any */
export const TABLES = [
  "article",
  "forum",
  "user",
  "therapist",
  "questionnaire",
  "post",
  "comment",
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
  toDTO: (entity: T, ...args: any[]) => DTO;
  buildSql: (...args: any[]) => SelectSql;
  buildSmallSql: (...args: any[]) => SmallSelectSql;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEmptyEntity: (...args: any[]) => T;
  getEmptyDto?: (...args: any[]) => DTO;
}
