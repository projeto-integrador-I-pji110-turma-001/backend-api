import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { AddAppointmentController } from '../http/controllers/appointment/AddAppointmentController';
import { GetAppointmentController } from '../http/controllers/appointment/GetAppointmentController';

export default class AppointmentRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private addAppointmentController: AddAppointmentController,
    private getAppointmentController: GetAppointmentController,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify
      .post(
        '/appointment',
        {
          schema: this.addAppointmentController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.addAppointmentController.handle.bind(this.addAppointmentController),
      )
      .get(
        '/appointment',
        {
          schema: this.getAppointmentController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.getAppointmentController.handle.bind(this.getAppointmentController),
      );
  }
}
