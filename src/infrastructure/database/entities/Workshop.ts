import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WorkshopStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
}

@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  weekday: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ type: 'int' })
  participants: number;

  @Column({
    type: 'enum',
    enum: WorkshopStatus,
    default: WorkshopStatus.ACTIVE,
  })
  status: WorkshopStatus;

  @CreateDateColumn()
  createdAt?: Date;
}
