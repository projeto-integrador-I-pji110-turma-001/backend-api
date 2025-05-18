import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type LoanStatus = 'pending' | 'returned';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  loanDate: Date;

  @Column({ type: 'timestamp' })
  returnDate: Date;

  @Column({ type: 'varchar', length: 255 })
  patientName: string;

  @Column({ type: 'varchar', length: 255 })
  equipment: string;

  @Column({ type: 'enum', enum: ['active', 'returned', 'overdue'] })
  status: LoanStatus;

  @CreateDateColumn()
  createdAt?: Date;
}
