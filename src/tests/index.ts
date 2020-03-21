import { getNewUpvotedStories } from '../main';
import { hackerNewsServiceSandbox, newUpvotedStories as newUpvotedStoriesFixture, populateStories } from '../services/hacker-news/mock';
import { expect } from 'chai';

describe("Get freshy upvoted stories from Hacker News with more than 500 upvotes", () => {
  afterEach(() => hackerNewsServiceSandbox.restore());

  it("Should correctly get new upvoted stories", async () => {
    for (const stories of newUpvotedStoriesFixture) {
      const newUpvotedStories = await getNewUpvotedStories();
      expect(newUpvotedStories).to.deep.equal(populateStories(stories));
    }
  });
});
