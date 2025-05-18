import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetLoanAction } from '../../../../domain/loan/GetLoanAction';

export type GetLoanSchema = yup.InferType<typeof getLoanSchema>;

const getLoanSchema = yup.object().shape({
  loanId: yup.string(),
});

export class GetLoanController extends Controller {
  constructor(private getLoanAction: GetLoanAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get loan',
      tags: ['loan'],
      security: [
        {
          bearerToken: [],
        },
      ],
      params: getLoanSchema,
    };
  }
  F;
  async handle(req: FastifyRequest) {
    const { params } = await this.validateInputs<GetLoanSchema, null, null>(req);
    return await this.getLoanAction.execute(params?.loanId);
  }
}
