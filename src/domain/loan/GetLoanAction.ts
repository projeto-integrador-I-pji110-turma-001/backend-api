import { LoanRepository } from '../../infrastructure/repositories/LoanRepository';
import { Action } from '../Action';

export class GetLoanAction extends Action {
  constructor(private loanRepository: LoanRepository) {
    super();
  }

  async execute(loanId?: string) {
    try {
      if (loanId) {
        return await this.loanRepository.getById(loanId);
      }
      return await this.loanRepository.getAll({});
    } catch (e) {
      throw new Error(e);
    }
  }
}
