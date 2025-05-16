import { AwilixResolver } from '../infrastructure/resolver';

export abstract class Action extends AwilixResolver {
  abstract execute(...args: any[]): Promise<any>;
}
