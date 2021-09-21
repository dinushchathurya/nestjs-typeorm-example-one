import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from "typeorm";

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string
  
}