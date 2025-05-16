import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PatientType {
  FAMILY = 'family',
  CANCER = 'cancer',
  OTHER = 'other',
}

export enum PatientStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PatientType,
  })
  type: PatientType;

  @Column({
    type: 'enum',
    enum: PatientStatus,
  })
  status: PatientStatus;

  @CreateDateColumn()
  createdAt?: Date;
}
