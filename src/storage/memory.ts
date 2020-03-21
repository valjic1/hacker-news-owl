import { IStorage, TStorageType } from '../shared/storage';
import logger from '../utils/logger';

export class MemoryStorage implements IStorage {
  storageType: TStorageType = "memory";
  stories: number[];

  constructor() {
    logger.info("App is using memory storage");
    this.stories = [];
  }

  async getPrevStoriesIds() {
    return Promise.resolve(this.stories);
  }

  setPrevStoriesIds(values: number[]) {
    this.stories = values;
  }
}
