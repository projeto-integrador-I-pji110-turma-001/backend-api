import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AliveHealthController } from '../http/controllers/health/AliveHealthController';
import { ReadyHealthController } from '../http/controllers/health/ReadyHealthController';
import { validatorCompiler } from '../http/validations/validatorCompiler';

export class HealthRoutes extends Routes {
  constructor(
    private aliveHealthController: AliveHealthController,
    private readyHealthController: ReadyHealthController,
  ) {
    super();
  }

  routes(fastify: FastifyInstance) {
    fastify
      .get(
        '/health/alive',
        { schema: this.aliveHealthController.validateSchema(), validatorCompiler },
        this.aliveHealthController.handle.bind(this.aliveHealthController),
      )
      .get(
        '/health/ready',
        { schema: this.readyHealthController.validateSchema(), validatorCompiler },
        this.readyHealthController.handle.bind(this.readyHealthController),
      );
  }
}
