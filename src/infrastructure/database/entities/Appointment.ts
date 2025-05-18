import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type AppointmentType = 'cancer' | 'family' | 'other';
export type AppointmentStatus = 'ongoing' | 'completed';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ type: 'varchar', length: 255 })
  patientName: string;

  @Column({ type: 'enum', enum: ['cancer', 'family', 'other'] })
  type: AppointmentType;

  @Column({ type: 'enum', enum: ['ongoing', 'completed'] })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt?: Date;
}
