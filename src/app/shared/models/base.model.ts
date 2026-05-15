export interface BaseEntity {
  id: string;
}

export interface AuditFields {
  createdAtUtc: string;
  modifiedAtUtc: string | null;
  createdByUserId: string;
  modifiedByUserId: string | null;
}
export interface PagedResult<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface QueryParams {
  skip?: number;
  limit?: number;
  q?: string;
  category?:string;
  sortBy?: string;
  order?: string;
  [key: string]: any;
}

export type ApiPagedResponse<T, K extends string> = {
  [P in K]: T[];
} & {
  total: number;
  skip: number;
  limit: number;
};
