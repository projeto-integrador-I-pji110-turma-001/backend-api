import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetWorkshopAction } from '../../../../domain/workshop/GetWorkshopAction';

export type GetWorkshopSchema = yup.InferType<typeof getWorkshopSchema>;

const getWorkshopSchema = yup.object().shape({
  patientId: yup.string(),
});

export class GetWorkshopController extends Controller {
  constructor(private getWorkshopAction: GetWorkshopAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get workshop',
      tags: ['workshop'],
      security: [
        {
          bearerToken: [],
        },
      ],
      params: getWorkshopSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { params } = await this.validateInputs<GetWorkshopSchema, null, null>(req);
    return await this.getWorkshopAction.execute(params?.patientId);
  }
}
