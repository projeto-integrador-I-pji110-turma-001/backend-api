import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { Patient } from '../database/entities/Patient';

export class PatientRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(userId: string) {
    return await this.db.getEntity(Patient).findOneBy({ userId });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral>) {
    return this.db.getEntity(Patient).find({ order: { createdAt: 'DESC' }, ...condition });
  }

  async add(obj: ObjectLiteral) {
    return this.db.getEntity(Patient).save(obj);
  }

  async delete(condition: ObjectLiteral) {
    console.log('condition', condition);
    return this.db.getEntity(Patient).createQueryBuilder().delete().where(condition).execute();
  }
}
