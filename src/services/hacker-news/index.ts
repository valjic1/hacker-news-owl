import hackerNewsService from './hacker-news';
import hackerNewsMockService from './mock/hacker-news.mock';
import { ENV } from '../../config/vars';

export default ENV === "test" ? hackerNewsMockService : hackerNewsService;
