import { FastifyInstance } from 'fastify';
import { HealthRoutes } from './HealthRoutes';
import { AwilixResolver } from '../resolver';
import PatientRoutes from './PatientRoutes';

export class ApiRouter extends AwilixResolver {
  constructor(private healthRoutes: HealthRoutes, private patientRoutes: PatientRoutes) {
    super();
  }

  loadRoutes(fastify: FastifyInstance) {
    this.healthRoutes.routes(fastify);
    this.patientRoutes.routes(fastify);
  }
}
