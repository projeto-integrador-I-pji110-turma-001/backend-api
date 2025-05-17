import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { AddWorkshopController } from '../http/controllers/workshop/AddWorkshopController';
import { GetWorkshopController } from '../http/controllers/workshop/GetWorkshopController';

export default class WorkshopRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private addWorkshopController: AddWorkshopController,
    private getWorkshopController: GetWorkshopController,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify
      .post(
        '/workshop',
        {
          schema: this.addWorkshopController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.addWorkshopController.handle.bind(this.addWorkshopController),
      )
      .get(
        '/workshop',
        {
          schema: this.getWorkshopController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.getWorkshopController.handle.bind(this.getWorkshopController),
      );
  }
}
