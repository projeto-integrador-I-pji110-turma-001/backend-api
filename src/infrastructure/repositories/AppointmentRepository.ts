import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { Appointment } from '../database/entities/Appointment';

export class AppointmentRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(userId: string) {
    return await this.db.getEntity(Appointment).findOneBy({ userId });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral>) {
    return this.db.getEntity(Appointment).find({ order: { createdAt: 'DESC' }, ...condition });
  }

  async add(obj: ObjectLiteral) {
    return this.db.getEntity(Appointment).save(obj);
  }

  async delete(condition: ObjectLiteral) {
    console.log('condition', condition);
    return this.db.getEntity(Appointment).createQueryBuilder().delete().where(condition).execute();
  }
}
