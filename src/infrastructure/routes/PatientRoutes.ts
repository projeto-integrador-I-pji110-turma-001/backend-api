import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AddPatientController } from '../http/controllers/patient/AddPatientController';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';

export default class PatientRoutes implements Routes {
  constructor(
    private addPatientController: AddPatientController,
    private authMiddleware: AuthMiddleware,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify.post(
      '/patient',
      {
        schema: this.addPatientController.validateSchema(),
        preValidation: this.authMiddleware.authenticate(),
      },
      this.addPatientController.handle.bind(this.addPatientController),
    );
  }
}
