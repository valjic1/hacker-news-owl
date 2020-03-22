import { Story } from '../shared/story';

const difference = (newStoriesIds: number[], prevStoriesIds: number[]) =>
  newStoriesIds.filter(x => !prevStoriesIds.includes(x));

// Stories test utilities
// TODO: Comment

export const storiesTestUtilFactory = (
  stories: Story[],
  bestStoriesIdsArray: number[][],
  upvoteTreshold: number
) => {
  const populateStories = (storyIds: number[]) =>
    storyIds.map(storyId =>
      stories.find(story => story.id === storyId)
    ) as Story[];

  const filterUpvotedStoriesIds = (storyIds: number[]) =>
    storyIds.filter(storyId => {
      const elem = stories.find(story => story.id === storyId);
      return elem && elem.score > upvoteTreshold;
    });

  const upvotedStoriesIdsArray = bestStoriesIdsArray.map(elem =>
    filterUpvotedStoriesIds(elem)
  );

  const { newUpvotedStoriesIdsArray } = upvotedStoriesIdsArray.reduce(
    (acc, current) => {
      if (!current.length) {
        acc.newUpvotedStoriesIdsArray.push([]);
      } else {
        acc.latestUpvotedStoriesIds = difference(
          current,
          acc.latestUpvotedStoriesIds
        );
        acc.newUpvotedStoriesIdsArray.push(acc.latestUpvotedStoriesIds);
      }

      return acc;
    },
    {
      latestUpvotedStoriesIds: [] as number[],
      newUpvotedStoriesIdsArray: [] as number[][]
    }
  );

  return {
    populateStories,
    newUpvotedStoriesIdsArray
  };
};
