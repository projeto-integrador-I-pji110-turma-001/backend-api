import { FastifyInstance } from 'fastify';
import { AwilixResolver } from '../resolver';

export abstract class Routes extends AwilixResolver {
  abstract routes(fastify: FastifyInstance): void;
}
