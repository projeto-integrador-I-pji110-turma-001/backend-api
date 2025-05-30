import {
  createContainer,
  AwilixContainer,
  asClass,
  asValue,
  Lifetime,
  InjectionMode,
} from 'awilix';
import { logger } from '../application/config/logger';
import { GlobalConfig } from '../application/config/globalConfig';
import { HttpServer } from './http/HttpServer';
import { AuthMiddleware } from './http/middlewares/AuthMiddleware';
import { Database } from './database';
import { ApiRouter } from './routes/ApiRouter';
import { HealthRoutes } from './routes/HealthRoutes';
import PatientRoutes from './routes/PatientRoutes';
import { PatientRepository } from './repositories/PatientRepository';
import { WorkshopRepository } from './repositories/WorkshopRepository';
import WorkshopRoutes from './routes/WorkshopRoutes';
import DonationRoutes from './routes/DonationRoutes';
import { DonationRepository } from './repositories/DonationRepository';
import { AppointmentRepository } from './repositories/AppointmentRepository';
import AppointmentRoutes from './routes/AppointmentRoutes';
import { LoanRepository } from './repositories/LoanRepository';
import LoanRoutes from './routes/LoanRoutes';

export class Container {
  instance: AwilixContainer;

  constructor() {}

  async loadContainers() {
    this.instance = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });

    let extension = 'ts';
    let dir = 'src';
    if (process.env.NODE_ENV === 'production') {
      extension = 'js';
      dir = 'build/src';
    }

    this.instance
      .register({
        globalConfig: asClass(GlobalConfig).singleton(),
        logger: asValue(logger),
        authMiddleware: asClass(AuthMiddleware).singleton(),
        httpServer: asClass(HttpServer)
          .singleton()
          .disposer((s) => s.dispose()),
      })

      .register({
        httpServer: asClass(HttpServer)
          .singleton()
          .disposer((s) => s.dispose()),
      })
      .register({
        db: asClass(Database)
          .singleton()
          .disposer((d) => d.dispose()),
        patientRepository: asClass(PatientRepository).singleton(),
        workshopRepository: asClass(WorkshopRepository).singleton(),
        donationRepository: asClass(DonationRepository).singleton(),
        appointmentRepository: asClass(AppointmentRepository).singleton(),
        loanRepository: asClass(LoanRepository).singleton(),
      })
      .register({
        healthRoutes: asClass(HealthRoutes).singleton(),
        patientRoutes: asClass(PatientRoutes).singleton(),
        workshopRoutes: asClass(WorkshopRoutes).singleton(),
        donationRoutes: asClass(DonationRoutes).singleton(),
        appointmentRoutes: asClass(AppointmentRoutes).singleton(),
        loanRoutes: asClass(LoanRoutes).singleton(),
      })
      .loadModules(
        [
          `${dir}/infrastructure/services/**/*.${extension}`,
          `${dir}/domain/**/*.${extension}`,
          `${dir}/domain/consumers**/*.${extension}`,
          `${dir}/infrastructure/http/controllers/**/*.${extension}`,
          `${dir}/infrastructure/http/routes/**/*.${extension}`,
        ],
        {
          formatName: 'camelCase',
          resolverOptions: {
            lifetime: Lifetime.SINGLETON,
            injectionMode: InjectionMode.CLASSIC,
            register: asClass,
            dispose: (d) => d.dispose && d.dispose(),
          },
        },
      )
      .register({
        apiRouter: asClass(ApiRouter).singleton(),
      });
  }

  resolve<T>(name: string) {
    return this.instance.resolve<T>(name);
  }

  async dispose() {
    await this.instance.dispose();
  }
}
