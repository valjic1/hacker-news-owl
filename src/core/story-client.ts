import {
  Error,
  IHackerNewsService,
  IStorage,
  IStoryClient,
  Response,
  Story,
  Success
} from "../shared/";

export class StoryClient implements IStoryClient {
  storage: IStorage;
  service: IHackerNewsService;
  upvoteTreshold: number;

  constructor(
    storage: IStorage,
    service: IHackerNewsService,
    upvoteTreshold: number
  ) {
    this.storage = storage;
    this.service = service;
    this.upvoteTreshold = upvoteTreshold;
  }

  /**
   * @name getUpvotedStories
   *
   * @description
   * Returns promise containing array of objects, where each object holds data about one of
   * currently best stories with more than {UPVOTE_TRESHOLD} upvotes.
   *
   * @returns {Promise<Story[]>}
   */
  getUpvotedStories = async (): Promise<Story[]> => {
    const bestStoriesIds = await this.service.getBestStoriesIds();

    if ((bestStoriesIds as Error).error) {
      return [];
    }

    const promises = (bestStoriesIds as Success<number[]>).data.map(storyId =>
      this.service.getStory(storyId)
    );

    return new Promise(resolve => {
      Promise.all(promises.map(p => p.catch(e => e))).then(
        (bestStories: Response<Story>[]) =>
          resolve(
            bestStories
              .filter(story => !(story as Error).error)
              .map(story => (story as Success<Story>).data)
              .filter(
                ({ id, score, title, url }) =>
                  id && url && title && score > this.upvoteTreshold
              )
          )
      );
    });
  };

  /**
   * @name getNewUpvotedStories
   *
   * @description
   * Returns promise containing array of objects, where each object holds data about
   * a fresh story with more than {UPVOTE_TRESHOLD} upvotes.
   *
   * @returns {Promise<Story[]>}
   */
  getNewUpvotedStories = async () => {
    const newUpvotedStories = await this.getUpvotedStories();

    if (!newUpvotedStories.length) {
      return [];
    }

    const upvotedStoriesIds = await this.storage.getUpvotedStoriesIds();

    this.storage.setUpvotedStoriesIds(newUpvotedStories.map(story => story.id));

    return newUpvotedStories.filter(
      ({ id }) => !upvotedStoriesIds.includes(id)
    );
  };
}
