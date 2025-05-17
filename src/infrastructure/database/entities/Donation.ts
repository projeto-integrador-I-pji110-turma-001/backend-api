import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum DonationStatus {
  PENDING = 'pending',
  RECEIVED = 'received',
}

export enum DonationType {
  MEDICINE = 'medicine',
  SUPPLIES = 'supplies',
  EQUIPMENT = 'equipment',
  MONEY = 'money',
  FOOD = 'food',
  CLOTHES = 'clothes',
  OTHER = 'other',
}

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({
    type: 'enum',
    enum: DonationType,
  })
  type: DonationType;

  @Column()
  amount: string;

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.PENDING,
  })
  status: DonationStatus;
}
