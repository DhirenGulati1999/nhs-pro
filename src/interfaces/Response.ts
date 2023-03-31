export interface BaseResponse<T> {
  StatusCode: number;
  Message: string;
  Data: T;
  TotalRecords: number;
}
