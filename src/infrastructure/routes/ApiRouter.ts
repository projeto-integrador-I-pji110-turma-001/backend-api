import { FastifyInstance } from 'fastify';
import { HealthRoutes } from './HealthRoutes';
import { AwilixResolver } from '../resolver';
import PatientRoutes from './PatientRoutes';
import WorkshopRoutes from './WorkshopRoutes';
import DonationRoutes from './DonationRoutes';
import AppointmentRoutes from './AppointmentRoutes';
import LoanRoutes from './LoanRoutes';

export class ApiRouter extends AwilixResolver {
  constructor(
    private healthRoutes: HealthRoutes,
    private patientRoutes: PatientRoutes,
    private workshopRoutes: WorkshopRoutes,
    private donationRoutes: DonationRoutes,
    private appointmentRoutes: AppointmentRoutes,
    private loanRoutes: LoanRoutes
  ) {
    super();
  }

  loadRoutes(fastify: FastifyInstance) {
    this.healthRoutes.routes(fastify);
    this.patientRoutes.routes(fastify);
    this.workshopRoutes.routes(fastify);
    this.donationRoutes.routes(fastify);
    this.appointmentRoutes.routes(fastify);
    this.loanRoutes.routes(fastify);
  }
}
