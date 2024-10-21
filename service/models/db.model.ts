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

export type TLikeTableName = Extract<
  TTableName,
  "article" | "post" | "comment"
>;

export interface ISelectSql {
  id: boolean;
}

export interface IWhereSql {
  where: {
    id?: string;
  };
}

export interface IServiceConfig<
  T,
  DTO,
  SelectSql,
  SmallSelectSql,
  ToDTOArgs extends unknown[] = [],
  SqlArgs extends unknown[] = [],
  SmallSqlArgs extends unknown[] = [],
  EmptyEntityArgs extends unknown[] = [],
  EmptyDtoArgs extends unknown[] = []
> {
  collectionName: TTableName;
  toDTO: (entity: T, ...args: ToDTOArgs) => DTO;
  buildSql: (...args: SqlArgs) => SelectSql;
  buildSmallSql: (...args: SmallSqlArgs) => SmallSelectSql;
  getEmptyEntity: (...args: EmptyEntityArgs) => T;
  getEmptyDto?: (...args: EmptyDtoArgs) => DTO;
}
