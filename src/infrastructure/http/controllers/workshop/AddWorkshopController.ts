import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddWorkshopAction } from '../../../../domain/workshop/AddWorkshopAction';

export const addWorkshopSchema = yup.object({
  name: yup.string().required('Nome da oficina é obrigatório'),
  weekday: yup
    .string()
    .oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], 'Dia da semana inválido')
    .required('Dia da semana é obrigatório'),
  startTime: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário de início inválido')
    .required('Horário de início é obrigatório'),
  endTime: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário de fim inválido')
    .required('Horário de fim é obrigatório')
    .test(
      'is-after-startTime',
      'Horário de fim deve ser depois do horário de início',
      function (value) {
        const { startTime } = this.parent;
        return value > startTime;
      },
    ),
  participants: yup
    .number()
    .integer('Participantes deve ser um número inteiro')
    .min(0, 'Participantes deve ser pelo menos 0')
    .required('Número de participantes é obrigatório'),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'cancelled'], 'Status inválido')
    .required('Status é obrigatório'),
});

export type AddWorkshopSchema = yup.InferType<typeof addWorkshopSchema>;

export class AddWorkshopController extends Controller {
  constructor(private addWorkshopAction: AddWorkshopAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add worhshop',
      tags: ['worhshop'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addWorkshopSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddWorkshopSchema>(req);
    return await this.addWorkshopAction.execute(body);
  }
}
