import { SlackClient } from "./slack-client";
import { StoryClient } from "./story-client";
import { REFRESH_INTERVAL_MINUTES, UPVOTE_TRESHOLD } from "../config/vars";
import hackerNewsService from "../services/hacker-news/hacker-news.service";
import slackService from "../services/slack/slack.service";
import storage from "../storage/";
import { CronJob } from "cron";

const slackClient = new SlackClient(slackService);

const storyClient = new StoryClient(
  storage,
  hackerNewsService,
  UPVOTE_TRESHOLD as number
);

export const job = new CronJob(
  `0 */${REFRESH_INTERVAL_MINUTES} * * * *`,
  () => {
    storyClient.getNewUpvotedStories().then(stories => {
      if (!stories.length) return;

      const message = slackClient.formatMessage(stories);
      slackClient.service.postToChannel(message);
    });
  }
);
