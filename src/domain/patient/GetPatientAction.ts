import { PatientRepository } from '../../infrastructure/repositories/PatientRepository';
import { Action } from '../Action';

export class GetPatientAction extends Action {
  constructor(private patientRepository: PatientRepository) {
    super();
  }

  async execute(patientId?: string) {
    try {
      if (patientId) {
        return await this.patientRepository.getById(patientId);
      }
      return await this.patientRepository.getAll({});
    } catch (e) {
      throw new Error(e);
    }
  }
}
