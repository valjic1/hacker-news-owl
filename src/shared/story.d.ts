import { AsyncResponse } from "./response";
import { IStorage } from "./storage";

export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number; // unix timestamp
  title: string;
  type: "story";
  url: string;
};

export interface IHackerNewsService {
  getStory: (storyId: number) => AsyncResponse<Story>;
  getBestStoriesIds: () => AsyncResponse<number[]>;
}

export interface IStoryClient {
  storage: IStorage;
  service: IHackerNewsService;
  upvoteTreshold: number;

  getUpvotedStories: () => Promise<Story[]>;
  getNewUpvotedStories: () => Promise<Story[]>;
}
