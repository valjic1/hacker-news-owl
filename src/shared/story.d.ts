import { Response } from './response';

export interface IStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number; // unix timestamp
  title: string;
  type: "story";
  url: string;
}

// Array containing story ids
export type Stories = number[];

export type TGetStory = (storyId: number) => Promise<Response<IStory>>;
export type TGetStories = () => Promise<Response<Stories>>;

export interface IHackerNewsService {
  getStory: TGetStory;
  getBestStoriesIds: TGetStories;
}
