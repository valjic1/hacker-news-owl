import {
  AsyncResponse,
  IHackerNewsService,
  Story,
  Success
  } from '../../shared';

/**
 * @name HackerNewsMockService
 */
export class HackerNewsMockService implements IHackerNewsService {
  stories: Story[];
  getBestStoriesIds: () => AsyncResponse<number[]>;

  constructor(
    stories: Story[],
    getBestStoriesIds: () => AsyncResponse<number[]>
  ) {
    this.stories = stories;
    this.getBestStoriesIds = getBestStoriesIds;
  }

  getStory = (storyId: number) =>
    Promise.resolve({
      data: this.stories.find(story => story.id === storyId)
    } as Success<Story>);
}
