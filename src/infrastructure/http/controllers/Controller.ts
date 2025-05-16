import { FastifyReply, FastifyRequest } from 'fastify';
import yup2openapi from '@rudi23/yup-to-openapi';
import { AwilixResolver } from '../../resolver';
import { AnyObject, ObjectSchema } from 'yup';

export type SchemaType = {
  description?: string;
  tags?: string[];
  security?: any[];
  querystring?: ObjectSchema<AnyObject>;
  params?: ObjectSchema<AnyObject>;
  body?: ObjectSchema<AnyObject>;
};

type ValidationResult<P, Q, B> = {
  params: P;
  querystring: Q;
  body: B;
};

export abstract class Controller extends AwilixResolver {
  abstract generateSchema(): SchemaType;

  validateSchema() {
    return this.generateSwagger();
  }

  private generateSwagger() {
    const schema = this.generateSchema();
    const swagger = { ...schema } as any;
    if (schema['params']) swagger['params'] = yup2openapi(schema['params'] as any);
    if (schema['querystring']) swagger['querystring'] = yup2openapi(schema['querystring'] as any);
    if (schema['body']) swagger['body'] = yup2openapi(schema['body'] as any);
    // console.log(swagger);
    return swagger;
  }

  async validateInputs<P, Q, B>(req: FastifyRequest): Promise<ValidationResult<P, Q, B>> {
    const schema = this.generateSchema();

    // @ts-expect-error can't initialize validationResult ahead of time without
    // typescript complaining because we don't know what P, Q and B will be.
    const validationResult: ValidationResult<P, Q, B> = {};
    try {
      for (const type in schema) {
        switch (type) {
          case 'params':
            validationResult.params = (await schema[type]?.validate(req.params)) as P;
            break;
          case 'querystring':
            validationResult.querystring = (await schema[type]?.validate(req.query)) as Q;
            break;
          case 'body':
            validationResult.body = (await schema[type]?.validate(req.body)) as B;
            break;
        }
      }
      return validationResult;
    } catch (err) {
      throw new Error(err);
    }
  }

  abstract handle(req: FastifyRequest, res: FastifyReply): Promise<any>;
}
