import { AddPatientSchema } from '../../infrastructure/http/controllers/patient/AddPatientController';
import { WorkshopRepository } from '../../infrastructure/repositories/WorkshopRepository';
import { Action } from '../Action';

export class AddWorkshopAction extends Action {
  constructor(private workshopRepository: WorkshopRepository) {
    super();
  }

  async execute(data: AddPatientSchema) {
    try {
      return await this.workshopRepository.add(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
