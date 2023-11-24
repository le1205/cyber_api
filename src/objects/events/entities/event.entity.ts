import { classToPlain, Expose } from "class-transformer";
import { UPLOAD_URL } from "src/config";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image?: string;

    @Column({default: false})
    status?: boolean;

    @Expose()
    get image_url() {
        return UPLOAD_URL + this.image;
    }

    toJSON() {
        return classToPlain(this);
    }
}
