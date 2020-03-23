import { Story } from './story';

export type SlackMessage = {
  type: "section" | "divider";
  text?: {
    type: "mrkdwn";
    text: string;
  };
};

interface ISlackService {
  postToChannel: (message: SlackMessage[]) => void;
}

interface ISlackClient {
  service: ISlackService;
  formatMessage: (stories: Story[]) => SlackMessage[];
}
