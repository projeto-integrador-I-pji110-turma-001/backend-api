import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddAppointmentAction } from '../../../../domain/appointment/AddAppointmentAction';

export const addAppointmentSchema = yup.object({
  appointmentDate: yup.date().required('Data do atendimento é obrigatória'),
  patientName: yup.string().trim().required('Nome do paciente é obrigatório'),
  type: yup
    .string()
    .oneOf(['cancer', 'family', 'other'], 'Tipo inválido')
    .required('Tipo é obrigatório'),
  status: yup
    .string()
    .oneOf(['ongoing', 'completed'], 'Status inválido')
    .required('Status é obrigatório'),
});

export type AddAppointmentSchema = yup.InferType<typeof addAppointmentSchema>;

export class AddAppointmentController extends Controller {
  constructor(private addAppointmentAction: AddAppointmentAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add appointment',
      tags: ['appointment'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addAppointmentSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddAppointmentSchema>(req);
    return await this.addAppointmentAction.execute(body);
  }
}
