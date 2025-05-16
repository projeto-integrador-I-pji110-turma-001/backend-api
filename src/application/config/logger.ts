import { RESOLVER } from 'awilix';
import { pino } from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      ignore: 'pid,hostname',
      translateTime: 'yyyy-mm-dd HH:MM:ss Z',
    },
  },
});

logger[RESOLVER] = {};
