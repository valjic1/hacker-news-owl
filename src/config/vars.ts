import { TStorageType } from '../shared';
import { config } from 'dotenv-safe';
import path from 'path';

config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

/**
 * Default env values
 */
const DEFAULT_PORT = 3000;
const NODE_ENVIRONMENTS = ["production", "development", "test"];
const DEFAULT_UPVOTE_TRESHOLD = 500;
const DEFAULT_REFRESH_INTERVAL = 1;

/**
 * Slack hook url
 */
export const HOOK_URL = process.env.HOOK_URL as string;

/**
 * Server port
 */
export const PORT = process.env.PORT || DEFAULT_PORT;

/**
 * Node runtime environment
 */
export const ENV = NODE_ENVIRONMENTS.includes(process.env.NODE_ENV as string)
  ? process.env.NODE_ENV
  : NODE_ENVIRONMENTS[0];

/**
 * After upvote treshold is passed story will appear in channel
 */
export const UPVOTE_TRESHOLD =
  Number.isNaN(Number(process.env.UPVOTE_TRESHOLD)) ||
  !process.env.UPVOTE_TRESHOLD
    ? DEFAULT_UPVOTE_TRESHOLD
    : process.env.UPVOTE_TRESHOLD;

/**
 * Refresh interval in minutes
 */
export const REFRESH_INTERVAL = Number.isNaN(
  Number(process.env.REFRESH_INTERVAL)
)
  ? DEFAULT_REFRESH_INTERVAL
  : process.env.REFRESH_INTERVAL;

/**
 * Storage type
 */
export const STORAGE_TYPE = process.env.STORAGE_TYPE as TStorageType;

/**
 * Redis url
 */
export const REDIS_URL = process.env.REDIS_URL;
