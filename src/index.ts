import { PORT, REFRESH_INTERVAL } from './config/vars';
import { formatMessage, getNewUpvotedStories } from './main';
import { postToChannel } from './services/slack';
import { CronJob } from 'cron';
import http from 'http';

const job = new CronJob(`0 */${REFRESH_INTERVAL} * * * *`, () => {
  getNewUpvotedStories().then(stories => {
    const message = formatMessage(stories);

    if (!!message.length) {
      postToChannel(message);
    }
  });
});

const server = http.createServer((req, res) => {
  res.end("Hacker News Owl");
});

job.start();
server.listen(PORT);
