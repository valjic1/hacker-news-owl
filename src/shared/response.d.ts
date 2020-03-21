export interface ISuccess<T> {
  data: T;
}

export interface IError {
  error: any;
}

export type Response<T> = ISuccess<T> | IError;
