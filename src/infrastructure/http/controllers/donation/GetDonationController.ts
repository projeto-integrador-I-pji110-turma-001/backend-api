import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetDonationAction } from '../../../../domain/donation/GetDonationAction';

export type GetDonationSchema = yup.InferType<typeof getDonationSchema>;

const getDonationSchema = yup.object().shape({
  donationId: yup.string(),
});

export class GetDonationController extends Controller {
  constructor(private getDonationAction: GetDonationAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get donation',
      tags: ['donation'],
      security: [
        {
          bearerToken: [],
        },
      ],
      params: getDonationSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { params } = await this.validateInputs<GetDonationSchema, null, null>(req);
    return await this.getDonationAction.execute(params?.donationId);
  }
}
