import { UPVOTE_TRESHOLD } from './config/vars';
import hackerNewsService from './services/hacker-news/';
import {
  IError,
  ISlackMessage,
  IStory,
  ISuccess,
  Response,
  Stories
  } from './shared/';
import storage from './storage/';

/**
 * @description
 * Returns array of promises, where each promise holds data about one of
 * currently best stories.
 *
 * @returns {Promise<IStory>[]}
 */
export const getBestStories = async () => {
  const response = await hackerNewsService.getBestStoriesIds();

  if (!!(response as IError).error) {
    return [];
  }

  return (response as ISuccess<Stories>).data.map(storyId =>
    hackerNewsService.getStory(storyId)
  );
};

/**
 * @description
 * Returns promise containing array of objects, where each object holds data about one of
 * currently best stories with more than {UPVOTE_TRESHOLD} upvotes.
 *
 * @returns {Promise<IStory[]>}
 */
export const getUpvotedStories = async (): Promise<IStory[]> => {
  const promises = await getBestStories();

  return new Promise(resolve => {
    Promise.all(promises.map(p => p.catch(e => e))).then(
      (result: Response<IStory>[]) =>
        resolve(
          result
            .filter(item => !(item as IError).error)
            .map(item => (item as ISuccess<IStory>).data)
            .filter(
              ({ id, score, title, url }) =>
                !!id && !!url && !!title && score > UPVOTE_TRESHOLD
            )
        )
    );
  });
};

/**
 * @description
 * Returns promise containing array of objects, where each object holds data about
 * a fresh story with more than {UPVOTE_TRESHOLD} upvotes.
 *
 * @returns {Promise<IStory[]>}
 */
export const getNewUpvotedStories = async () => {
  const upvotedStories = await getUpvotedStories();
  const prevUpvotedStoriesIds = await storage.getPrevStoriesIds();

  storage.setPrevStoriesIds(upvotedStories.map(story => story.id));

  return upvotedStories.filter(({ id }) => !prevUpvotedStoriesIds.includes(id));
};

/**
 * @description
 * Returns message block formated according to provided stories
 *
 * @param {IStory[]} stories
 *
 * @returns {ISlackMessage[]}
 */
export const formatMessage = (stories: IStory[]) =>
  stories
    .reduce((message, { title, url }) => {
      message.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*<${url}|${title}>*`
          }
        },
        { type: "divider" }
      );

      return message;
    }, [] as ISlackMessage[])
    .slice(0, -1);
