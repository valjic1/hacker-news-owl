import { IHackerNewsService, Story } from '../../shared';
import { get } from '../../utils/http';

/**
 * @name HackerNewsService
 */
export class HackerNewsService implements IHackerNewsService {
  /**
   * @description
   * Returns info about story wth provided id
   *
   * @param {String} storyId
   *
   * @apiSuccess   {String}          by
   * @apiSuccess   {Number}          descendants
   * @apiSuccess   {Number}          id
   * @apiSuccess   {Array[Number]}   kids
   * @apiSuccess   {Number}          score
   * @apiSuccess   {Number}          time
   * @apiSuccess   {String}          title
   * @apiSuccess   {String}          type
   * @apiSuccess   {String}          url
   */
  getStory = (storyId: number) =>
    get<Story>(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, {
      json: true
    });

  /**
   * @description
   * Returns array of ids for best stories
   *
   * @apiSuccess   {Array[Number]}
   */
  getBestStoriesIds = () =>
    get<number[]>("https://hacker-news.firebaseio.com/v0/beststories.json", {
      json: true
    });
}

export default new HackerNewsService();
