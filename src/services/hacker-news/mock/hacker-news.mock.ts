import { bestStories, stories as storiesMock } from './stories.fixture';
import {
  IHackerNewsService,
  IStory,
  Response,
  TGetStories
  } from '../../../shared';
import sinon from 'sinon';

/**
 * @name HackerNewsMockService
 */
export class HackerNewsMockService implements IHackerNewsService {
  stories: IStory[];
  sandbox: sinon.SinonSandbox;
  getBestStoriesIds: TGetStories;

  constructor(stories: IStory[], sandbox: sinon.SinonSandbox) {
    this.stories = stories;
    this.sandbox = sandbox;

    /**
     * @description
     * Returns array of ids for best stories
     *
     * @apiSuccess   {Array[Number]}
     */
    this.getBestStoriesIds = this.sandbox
      .stub()
      .onFirstCall()
      .callsFake(() => {
        return Promise.resolve({ data: bestStories[0] });
      })
      .onSecondCall()
      .callsFake(() => {
        return Promise.resolve({ data: bestStories[1] });
      })
      .onThirdCall()
      .callsFake(() => {
        return Promise.resolve({ data: bestStories[2] });
      });
  }

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
    Promise.resolve({
      data: this.stories.find(story => story.id === storyId)
    } as Response<IStory>);
}

export const hackerNewsServiceSandbox = sinon.createSandbox();
export default new HackerNewsMockService(storiesMock, hackerNewsServiceSandbox);
