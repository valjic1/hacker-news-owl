import {
  ISlackClient,
  ISlackService,
  SlackMessage,
  Story
  } from '../shared/';

export class SlackClient implements ISlackClient {
  public service: ISlackService;

  constructor(service: ISlackService) {
    this.service = service;
  }

  /**
   * @name formatMessage
   *
   * @description
   * Returns message block formated according to provided stories
   *
   * @param {Story[]} stories
   *
   * @returns {SlackMessage[]}
   */
  formatMessage = (stories: Story[]) =>
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
      }, [] as SlackMessage[])
      .slice(0, -1);
}
