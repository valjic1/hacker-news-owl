import { HOOK_URL } from "../../config/vars";
import { ISlackService, SlackMessage } from "../../shared/slack";
import { post } from "../../utils/http";

export class SlackService implements ISlackService {
  /**
   * @description
   * Posts new upvoted stories to slack channel
   */
  postToChannel = (message: SlackMessage[]) =>
    post(HOOK_URL, { blocks: message }, { json: true });
}

export default new SlackService();
