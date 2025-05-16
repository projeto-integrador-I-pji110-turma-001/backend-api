import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';

export class AliveHealthController extends Controller {
  constructor() {
    super();
  }

  generateSchema() {
    return {};
  }

  async handle(_: FastifyRequest) {
    return { message: 'ok' };
  }
}
