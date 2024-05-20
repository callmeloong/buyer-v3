export type TApiPath =
  | "BASE"
  | "ADDON"
  | "PRODUCT"
  | "ORDER"
  | "CATALOG"
  | "PROMOTION"
  | "PSP"
  | "SSP"
  | "PASP";

export type TRes<T> = {
  code: number;
  message: string;
  data: T;
  error: any;
};

export type PagingData<T> = {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
  content: T;
};
