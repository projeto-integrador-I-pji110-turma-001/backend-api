import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { AddLoanController } from '../http/controllers/loan/AddLoanController';
import { GetLoanController } from '../http/controllers/loan/GetLoanController';

export default class LoanRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private addLoanController: AddLoanController,
    private getLoanController: GetLoanController,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify
      .post(
        '/loan',
        {
          schema: this.addLoanController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.addLoanController.handle.bind(this.addLoanController),
      )
      .get(
        '/loan',
        {
          schema: this.getLoanController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.getLoanController.handle.bind(this.getLoanController),
      );
  }
}
