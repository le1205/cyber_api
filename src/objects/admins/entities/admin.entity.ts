import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';


@Entity()
export class Admin extends BaseEntity  {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: false })
    is_deleted: boolean;

    @Column()
    name: string;

    @Column()
    lastname: string;


    @Column()
    email: string;

    @Column({select: false})
    password: string;



}
