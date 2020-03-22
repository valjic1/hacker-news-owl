export type StorageType = "redis" | "memory";

export interface IStorage {
  storageType: StorageType;
  getUpvotedStoriesIds: () => Promise<number[]>;
  setUpvotedStoriesIds: (values: number[]) => void;
}
