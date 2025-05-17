import { DonationRepository } from '../../infrastructure/repositories/DonationRepository';
import { Action } from '../Action';

export class GetDonationAction extends Action {
  constructor(private donationRepository: DonationRepository) {
    super();
  }

  async execute(donationId?: string) {
    try {
      if (donationId) {
        return await this.donationRepository.getById(donationId);
      }
      return await this.donationRepository.getAll({});
    } catch (e) {
      throw new Error(e);
    }
  }
}
