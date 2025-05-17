import { FastifyInstance } from 'fastify';
import { HealthRoutes } from './HealthRoutes';
import { AwilixResolver } from '../resolver';
import PatientRoutes from './PatientRoutes';
import WorkshopRoutes from './WorkshopRoutes';

export class ApiRouter extends AwilixResolver {
  constructor(
    private healthRoutes: HealthRoutes,
    private patientRoutes: PatientRoutes,
    private workshopRoutes: WorkshopRoutes,
  ) {
    super();
  }

  loadRoutes(fastify: FastifyInstance) {
    this.healthRoutes.routes(fastify);
    this.patientRoutes.routes(fastify);
    this.workshopRoutes.routes(fastify);
  }
}
