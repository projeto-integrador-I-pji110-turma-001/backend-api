import { ObjectLiteral } from 'typeorm';
import { AwilixResolver } from '../resolver';

export abstract class Repository extends AwilixResolver {
  abstract getById(id: string): Promise<ObjectLiteral>;
}
