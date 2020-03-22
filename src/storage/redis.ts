import { ENV } from '../config/vars';
import { IStorage, StorageType } from '../shared/storage';
import logger from '../utils/logger';
import redis from 'redis';

export class RedisStorage implements IStorage {
  client: redis.RedisClient;
  UPVOTED_STORIES_KEY: string;
  storageType: StorageType = "redis";

  constructor(redisUrl: string) {
    this.client = redis.createClient(redisUrl);

    this.client.on("connect", () => {
      if (ENV === "test") {
        // Empty storage before executing test
        this.UPVOTED_STORIES_KEY = "UPVOTED_STORIES_TEST";
        this.deleteItem(this.UPVOTED_STORIES_KEY);
      } else {
        logger.info("App is using redis storage");
        this.UPVOTED_STORIES_KEY = "UPVOTED_STORIES_KEY";
      }
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
    if (!values.length) return;

    this.client.hmset(key, [...values]);
  }

  deleteItem(key: string) {
    this.client.del(key);
  }

  async getUpvotedStoriesIds() {
    const result = await this.getItem(this.UPVOTED_STORIES_KEY);
    return !!result
      ? Object.values(result as string[]).map(value => Number(value))
      : [];
  }

  setUpvotedStoriesIds(values: number[]) {
    this.deleteItem(this.UPVOTED_STORIES_KEY);

    const newValues = values.reduce((acc, value, index) => {
      acc.push(index, value);
      return acc;
    }, [] as number[]);

    this.setItem(this.UPVOTED_STORIES_KEY, newValues);
  }
}
