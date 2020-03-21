import { ENV } from '../config/vars';
import { IStorage, TStorageType } from '../shared/storage';
import logger from '../utils/logger';
import redis from 'redis';

export class RedisStorage implements IStorage {
  storageType: TStorageType = "redis";
  client: redis.RedisClient;
  PREV_STORIES_KEY: string;

  constructor(redisUrl: string) {
    this.PREV_STORIES_KEY =
      ENV === "test"
        ? Math.random()
            .toString(36)
            .substring(7)
        : "PREV_STORIES";

    this.client = redis.createClient(redisUrl);

    this.client.on("connect", () => {
      logger.info("App is using redis storage");
    });

    this.client.on("error", error => {
      logger.error(error);
    });
  }

  getItem(key: string) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(key, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  }

  setItem(key: string, values: any[]) {
    this.client.hmset(key, [...values]);
  }

  deleteItem(key: string) {
    this.client.del(key);
  }

  async getPrevStoriesIds() {
    const result = await this.getItem(this.PREV_STORIES_KEY);
    return !!result
      ? Object.values(result as string[]).map(value => Number(value))
      : [];
  }

  setPrevStoriesIds(values: number[]) {
    this.deleteItem(this.PREV_STORIES_KEY);

    const newValues = values.reduce((acc, value, index) => {
      acc.push(index);
      acc.push(value);
      return acc;
    }, [] as number[]);

    this.setItem(this.PREV_STORIES_KEY, newValues);
  }
}
