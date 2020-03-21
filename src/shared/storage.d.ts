export type TStorageType = "redis" | "memory";

export interface IStorage {
  storageType: TStorageType;
  getPrevStoriesIds: () => Promise<number[]>;
  setPrevStoriesIds: (values: number[]) => void;
}
