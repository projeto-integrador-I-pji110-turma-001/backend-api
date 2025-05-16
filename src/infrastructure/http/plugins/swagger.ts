'use strict';

import { FastifyInstance } from 'fastify';

import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Bez Backend APIs',
        description: '',
        version: '',
      },
      servers: [
        {
          url: process.env.SWAGGER_API_URL ?? 'http://localhost:8080',
        },
      ],
      components: {
        securitySchemes: {
          'x-internal-api-key': {
            type: 'apiKey',
            in: 'header',
            name: 'x-internal-api-key',
          },
          bearerToken: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });
  fastify.register(swaggerUi, {
    routePrefix: '/swagger',
  });
  
  fastify.get('/documentation/json', async (_, reply) => {
    const swaggerDoc = fastify.swagger();
    reply.send(swaggerDoc);
  });
});
