import { AppointmentRepository } from '../../infrastructure/repositories/AppointmentRepository';
import { Action } from '../Action';

export class GetAppointmentAction extends Action {
  constructor(private appointmentRepository: AppointmentRepository) {
    super();
  }

  async execute(appointmentId?: string) {
    try {
      if (appointmentId) {
        return await this.appointmentRepository.getById(appointmentId);
      }
      return await this.appointmentRepository.getAll({});
    } catch (e) {
      throw new Error(e);
    }
  }
}
