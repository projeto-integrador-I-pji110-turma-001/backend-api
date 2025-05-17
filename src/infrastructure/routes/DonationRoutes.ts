import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { AddDonationController } from '../http/controllers/donation/AddDonationController';
import { GetDonationController } from '../http/controllers/donation/GetDonationController';

export default class DonationRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private addDonationController: AddDonationController,
    private getDonationController: GetDonationController,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify
      .post(
        '/donation',
        {
          schema: this.addDonationController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.addDonationController.handle.bind(this.addDonationController),
      )
      .get(
        '/donation',
        {
          schema: this.getDonationController.validateSchema(),
          preValidation: this.authMiddleware.authenticate(),
        },
        this.getDonationController.handle.bind(this.getDonationController),
      );
  }
}
