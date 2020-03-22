import { Story } from './story';

export type SlackMessage = {
  type: string;
  text?: {
    type: string;
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
