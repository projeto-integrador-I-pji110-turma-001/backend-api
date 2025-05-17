import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetPatientAction } from '../../../../domain/patient/GetPatientAction';

export type GetPatientSchema = yup.InferType<typeof getPatientSchema>;

const getPatientSchema = yup.object().shape({
  patientId: yup.string(),
});

export class GetPatientController extends Controller {
  constructor(private getPatientAction: GetPatientAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get patient',
      tags: ['patient'],
      security: [
        {
          bearerToken: [],
        },
      ],
      params: getPatientSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { params } = await this.validateInputs<GetPatientSchema, null, null>(req);
    return await this.getPatientAction.execute(params?.patientId);
  }
}
