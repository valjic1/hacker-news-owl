import { PORT } from './config/vars';
import { job } from './core/job';
import { server } from './core/server';

job.start();
server.listen(PORT);
