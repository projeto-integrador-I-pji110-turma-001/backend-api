'use strict';

import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { GlobalConfig } from '../../../application/config/globalConfig';

export default (globalConfig: GlobalConfig) =>
  fp(async function (fastify: FastifyInstance) {
    fastify.register(jwt, {
      secret: globalConfig.jwtSecret,
    });
  });
