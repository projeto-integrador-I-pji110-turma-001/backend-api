import { FastifyInstance } from 'fastify';
import { HealthRoutes } from './HealthRoutes';
import { AwilixResolver } from '../resolver';
import PatientRoutes from './PatientRoutes';
import WorkshopRoutes from './WorkshopRoutes';
import DonationRoutes from './DonationRoutes';

export class ApiRouter extends AwilixResolver {
  constructor(
    private healthRoutes: HealthRoutes,
    private patientRoutes: PatientRoutes,
    private workshopRoutes: WorkshopRoutes,
    private donationRoutes: DonationRoutes,
  ) {
    super();
  }

  loadRoutes(fastify: FastifyInstance) {
    this.healthRoutes.routes(fastify);
    this.patientRoutes.routes(fastify);
    this.workshopRoutes.routes(fastify);
    this.donationRoutes.routes(fastify);
  }
}
