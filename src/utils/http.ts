import logger from "./logger";
import { AsyncResponse } from "../shared/response";
import request from "request";

const requestPromise = (
  options: request.Options
): Promise<request.Response> => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      }

      resolve(response);
    });
  });
};

const execute = async <T>(options: request.Options): AsyncResponse<T> => {
  try {
    const { body: data } = await requestPromise(options);
    return { data };
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

export const get = <T>(url: string, options = {}) => {
  const req = Object.assign({}, options, { url });
  return execute<T>(req);
};

export const post = <T>(url: string, data = {}, options = {}) => {
  const req = Object.assign({}, options, {
    url,
    body: data,
    method: "POST"
  });
  return execute<T>(req);
};
