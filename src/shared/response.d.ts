export type Error = { error: any };

export type Success<T> = { data: T };

export type Response<T> = Success<T> | Error;

export type AsyncResponse<T> = Promise<Response<T>>;
