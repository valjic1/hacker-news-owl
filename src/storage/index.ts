import { MemoryStorage } from "./memory";
import { RedisStorage } from "./redis";
import { REDIS_URL, STORAGE_TYPE } from "../config/vars";

export default STORAGE_TYPE === "redis" && REDIS_URL
  ? new RedisStorage(REDIS_URL)
  : new MemoryStorage();
