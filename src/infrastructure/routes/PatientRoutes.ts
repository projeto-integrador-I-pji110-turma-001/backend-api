import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AddPatientController } from '../http/controllers/patient/AddPatientController';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { GetPatientController } from '../http/controllers/patient/GetPatientController';

export default class PatientRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private addPatientController: AddPatientController,
    private getPatientController: GetPatientController,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify
      .post(
        '/patient',
        {
          schema: this.addPatientController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.addPatientController.handle.bind(this.addPatientController),
      )
      .get(
        '/patient',
        {
          schema: this.getPatientController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.getPatientController.handle.bind(this.getPatientController),
      );
  }
}
