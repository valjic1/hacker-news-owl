import { StorageType } from '../shared';
import { config } from 'dotenv-safe';
import path from 'path';

config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

export const ENV = process.env.NODE_ENV || "production";
export const PORT = process.env.PORT || 3000;
export const HOOK_URL = process.env.HOOK_URL as string;
export const STORAGE_TYPE = (process.env.STORAGE_TYPE ||
  "memory") as StorageType;
export const REDIS_URL = process.env.REDIS_URL;
export const UPVOTE_TRESHOLD = process.env.UPVOTE_TRESHOLD || 500;
export const REFRESH_INTERVAL_MINUTES =
  process.env.REFRESH_INTERVAL_MINUTES || 15;
