import { AddDonationSchema } from '../../infrastructure/http/controllers/donation/AddDonationController';
import { DonationRepository } from '../../infrastructure/repositories/DonationRepository';
import { Action } from '../Action';

export class AddDonationAction extends Action {
  constructor(private donationRepository: DonationRepository) {
    super();
  }

  async execute(data: AddDonationSchema) {
    try {
      return await this.donationRepository.add(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
