'use strict';

import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(multipart, {
    attachFieldsToBody: true,
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fileSize: 50000000, // For multipart forms, the max file size in bytes
      files: 5, // Max number of file fields
    },
  });
});
