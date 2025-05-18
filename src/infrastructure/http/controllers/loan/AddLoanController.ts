import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddLoanAction } from '../../../../domain/loan/AddLoanAction';

export const addLoanSchema = yup.object({
  loanDate: yup.date().required('A data do empréstimo é obrigatória'),
  returnDate: yup.date().required('A data do empréstimo é obrigatória'),
  patientName: yup.string().required('O nome do paciente é obrigatório'),
  equipment: yup.string().required('O equipamento é obrigatório'),
  status: yup
    .mixed<'active' | 'returned' | 'overdue'>()
    .oneOf(['active', 'returned', 'overdue'], 'Status inválido')
    .required('O status é obrigatório'),
});

export type AddLoanSchema = yup.InferType<typeof addLoanSchema>;

export class AddLoanController extends Controller {
  constructor(private addLoanAction: AddLoanAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add loan',
      tags: ['loan'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addLoanSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddLoanSchema>(req);
    return await this.addLoanAction.execute(body);
  }
}
