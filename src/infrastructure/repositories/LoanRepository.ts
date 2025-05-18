import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { Loan } from '../database/entities/Loan';

export class LoanRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(userId: string) {
    return await this.db.getEntity(Loan).findOneBy({ userId });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral>) {
    return this.db.getEntity(Loan).find({ order: { createdAt: 'DESC' }, ...condition });
  }

  async add(obj: ObjectLiteral) {
    return this.db.getEntity(Loan).save(obj);
  }

  async delete(condition: ObjectLiteral) {
    console.log('condition', condition);
    return this.db.getEntity(Loan).createQueryBuilder().delete().where(condition).execute();
  }
}
