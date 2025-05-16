import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskInstruction {
  "buy-shares" = "buy-shares",
  "on-ramp" = "on-ramp",
  "off-ramp" = "off-ramp",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  orderId: number;

  @Column()
  instruction: TaskInstruction;

  @Column()
  createdAt: Date;
}
