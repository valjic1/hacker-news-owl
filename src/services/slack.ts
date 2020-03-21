import { HOOK_URL } from '../config/vars';
import { ISlackMessage } from '../shared/slack';
import { post } from '../utils/http';

/**
 * @description
 * Posts new upvoted stories to slack channel
 */
export const postToChannel = (message: ISlackMessage[]) =>
  post(HOOK_URL, { blocks: message }, { json: true });
