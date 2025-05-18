import { AddAppointmentSchema } from '../../infrastructure/http/controllers/appointment/AddAppointmentController';
import { AppointmentRepository } from '../../infrastructure/repositories/AppointmentRepository';
import { Action } from '../Action';

export class AddAppointmentAction extends Action {
  constructor(private appointmentRepository: AppointmentRepository) {
    super();
  }

  async execute(data: AddAppointmentSchema) {
    try {
      return await this.appointmentRepository.add(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
