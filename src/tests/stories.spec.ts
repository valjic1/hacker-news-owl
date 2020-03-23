import { stories as storiesMock } from './mock/stories.fixture';
import { storiesTestUtilFactory } from './stories.util';
import { REDIS_URL, UPVOTE_TRESHOLD } from '../config/vars';
import { StoryClient } from '../core/story-client';
import { HackerNewsMockService } from '../services/hacker-news/hacker-news.mock.service';
import { AsyncResponse, IStorage, Story } from '../shared';
import { MemoryStorage } from '../storage/memory';
import { RedisStorage } from '../storage/redis';
import { expect } from 'chai';
import { createSandbox } from 'sinon';

const sandbox = createSandbox();

const testNewUpvotedStories = ((stories: Story[]) => async (
  bestStoriesIdsArray: number[][],
  getBestStoriesIds: () => AsyncResponse<number[]>,
  storage: IStorage
) => {
  const hackerNewsService = new HackerNewsMockService(
    stories,
    getBestStoriesIds
  );

  const storyClient = new StoryClient(
    storage,
    hackerNewsService,
    UPVOTE_TRESHOLD as number
  );

  const storiesTestUtil = storiesTestUtilFactory(
    stories,
    bestStoriesIdsArray,
    UPVOTE_TRESHOLD as number
  );

  for (const storiesIds of storiesTestUtil.newUpvotedStoriesIdsArray) {
    const newUpvotedStories = await storyClient.getNewUpvotedStories();

    expect(newUpvotedStories).to.deep.equal(
      storiesTestUtil.populateStories(storiesIds)
    );
  }
})(storiesMock);

// tslint:disable only-arrow-functions
describe(`Get freshy upvoted stories from Hacker News with more than ${UPVOTE_TRESHOLD} upvotes`, () => {
  afterEach(() => sandbox.resetBehavior());

  it("Should correctly fetch new upvoted stories [using memory storage]", async function() {
    const bestStoriesIdsArray = [
      [1, 2, 3, 4, 5, 6, 7],
      [],
      [4, 5, 6, 7, 8, 9, 10],
      [],
      [],
      [10, 11, 12]
    ];

    const getBestStoriesIds = bestStoriesIdsArray.reduce(
      (acc, value, index) =>
        acc.onCall(index).callsFake(() => Promise.resolve({ data: value })),
      sandbox.stub()
    );

    const storage = new MemoryStorage();

    await testNewUpvotedStories(
      bestStoriesIdsArray,
      getBestStoriesIds,
      storage
    );
  });

  it("Should correctly fetch new upvoted stories [using redis storage]", async function() {
    const bestStoriesIdsArray = [
      [1, 2, 3, 4, 5, 6, 7],
      [],
      [4, 5, 6, 7, 8, 9, 10],
      [],
      [],
      [10, 11, 12]
    ];

    const getBestStoriesIds = bestStoriesIdsArray.reduce(
      (acc, value, index) =>
        acc.onCall(index).callsFake(() => Promise.resolve({ data: value })),
      sandbox.stub()
    );

    if (!REDIS_URL) {
      this.skip();
    } else {
      const storage = new RedisStorage(REDIS_URL);
      await storage.clearUpvotedStoriesIds();

      await testNewUpvotedStories(
        bestStoriesIdsArray,
        getBestStoriesIds,
        storage
      );
    }
  });

  it("Should correctly handle errors during fetching of upvoted stories [using memory storage]", async function() {
    const bestStoriesIdsArray = [
      [1, 2, 3, 4, 5, 6, 7],
      [],
      [4, 5, 6, 7, 8, 9, 10]
    ];

    const getBestStoriesIds = sandbox
      .stub()
      .onFirstCall()
      .callsFake(() => Promise.resolve({ data: [1, 2, 3, 4, 5, 6, 7] }))
      .onSecondCall()
      .callsFake(() => Promise.resolve({ error: "[TEST] Error" }))
      .onThirdCall()
      .callsFake(() => Promise.resolve({ data: [4, 5, 6, 7, 8, 9, 10] }));

    const storage = new MemoryStorage();

    await testNewUpvotedStories(
      bestStoriesIdsArray,
      getBestStoriesIds,
      storage
    );
  });

  it("Should correctly handle errors during fetching of upvoted stories [using redis storage]", async function() {
    const bestStoriesIdsArray = [
      [1, 2, 3, 4, 5, 6, 7],
      [],
      [4, 5, 6, 7, 8, 9, 10]
    ];

    const getBestStoriesIds = sandbox
      .stub()
      .onFirstCall()
      .callsFake(() => Promise.resolve({ data: [1, 2, 3, 4, 5, 6, 7] }))
      .onSecondCall()
      .callsFake(() => Promise.resolve({ error: "[TEST] Error" }))
      .onThirdCall()
      .callsFake(() => Promise.resolve({ data: [4, 5, 6, 7, 8, 9, 10] }));

    if (!REDIS_URL) {
      this.skip();
    } else {
      const storage = new RedisStorage(REDIS_URL);
      await storage.clearUpvotedStoriesIds();

      await testNewUpvotedStories(
        bestStoriesIdsArray,
        getBestStoriesIds,
        storage
      );
    }
  });
});
