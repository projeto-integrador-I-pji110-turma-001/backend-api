import { AddLoanSchema } from '../../infrastructure/http/controllers/loan/AddLoanController';
import { LoanRepository } from '../../infrastructure/repositories/LoanRepository';
import { Action } from '../Action';

export class AddLoanAction extends Action {
  constructor(private loanRepository: LoanRepository) {
    super();
  }

  async execute(data: AddLoanSchema) {
    try {
      return await this.loanRepository.add(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
