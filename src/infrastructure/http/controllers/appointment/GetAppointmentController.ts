import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetAppointmentAction } from '../../../../domain/appointment/GetAppointmentAction';

export type GetAppointmentSchema = yup.InferType<typeof getAppointmentSchema>;

const getAppointmentSchema = yup.object().shape({
 appointmentId: yup.string(),
});

export class GetAppointmentController extends Controller {
  constructor(private getAppointmentAction: GetAppointmentAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get appointment',
      tags: ['appointment',],
      security: [
        {
          bearerToken: [],
        },
      ],
      params: getAppointmentSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { params } = await this.validateInputs<GetAppointmentSchema, null, null>(req);
    return await this.getAppointmentAction.execute(params?.appointmentId);
  }
}
