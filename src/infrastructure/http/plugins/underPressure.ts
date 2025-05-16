"use strict";
import v8 from "v8";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import underPressure from "@fastify/under-pressure";

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(underPressure, {
    maxEventLoopDelay: 1000, // ms
    maxHeapUsedBytes: v8.getHeapStatistics().heap_size_limit,
    maxRssBytes: v8.getHeapStatistics().total_available_size,
    pressureHandler: (_req, _rep, type, value) => {
      if (type === underPressure.TYPE_HEAP_USED_BYTES) {
        throw new Error(`too many heap bytes used: ${value}`);
      } else if (type === underPressure.TYPE_EVENT_LOOP_DELAY) {
        throw new Error(`too much delay in event loop: ${value}`);
      }
    },
    exposeStatusRoute: {
      routeOpts: {
        logLevel: "debug",
      },
      routeSchemaOpts: {
        // If you also want to set a custom route schema
      },
      routeResponseSchemaOpts: {
        metrics: {
          type: "object",
          properties: {
            eventLoopDelay: { type: "number" },
            rssBytes: { type: "number" },
            heapUsed: { type: "number" },
            eventLoopUtilized: { type: "number" },
          },
        },
      },
      url: "/health/status", // If you also want to set a custom route path and pass options
    },
    healthCheck: async (fastifyInstance: FastifyInstance) => {
      return {
        metrics: fastifyInstance.memoryUsage(),
      };
    },
    healthCheckInterval: 5000,
  });
});
