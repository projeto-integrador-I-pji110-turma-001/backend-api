import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { Workshop } from '../database/entities/Workshop';

export class WorkshopRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(userId: string) {
    return await this.db.getEntity(Workshop).findOneBy({ userId });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral>) {
    return this.db.getEntity(Workshop).find({ order: { createdAt: 'DESC' }, ...condition });
  }

  async add(obj: ObjectLiteral) {
    return this.db.getEntity(Workshop).save(obj);
  }

  async delete(condition: ObjectLiteral) {
    console.log('condition', condition);
    return this.db.getEntity(Workshop).createQueryBuilder().delete().where(condition).execute();
  }
}
