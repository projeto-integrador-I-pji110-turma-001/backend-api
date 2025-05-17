import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { Donation } from '../database/entities/Donation';

export class DonationRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(userId: string) {
    return await this.db.getEntity(Donation).findOneBy({ userId });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral>) {
    return this.db.getEntity(Donation).find({ order: { createdAt: 'DESC' }, ...condition });
  }

  async add(obj: ObjectLiteral) {
    return this.db.getEntity(Donation).save(obj);
  }

  async delete(condition: ObjectLiteral) {
    console.log('condition', condition);
    return this.db.getEntity(Donation).createQueryBuilder().delete().where(condition).execute();
  }
}
