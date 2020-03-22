import { ENV } from '../config/vars';
import { IStorage, StorageType } from '../shared/storage';
import logger from '../utils/logger';


export class MemoryStorage implements IStorage {
  storageType: StorageType = "memory";
  stories: {
    upvoted: number[];
  };

  constructor() {
    if (ENV !== "test") {
      logger.info("App is using memory storage");
    }

    this.stories = {
      upvoted: []
    };
  }

  async getUpvotedStoriesIds() {
    return Promise.resolve(this.stories.upvoted);
  }

  setUpvotedStoriesIds(values: number[]) {
    this.stories.upvoted = values;
  }
}
