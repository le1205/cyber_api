import { classToPlain, Exclude, Expose, plainToClass } from 'class-transformer';
import { UPLOAD_URL } from 'src/config';
import { convertToSlug } from 'src/file-upload.utils';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  banner_image: string;

  @Expose()
  get image() {
    return UPLOAD_URL + this.banner_image;
  }

  toJSON() {
    return classToPlain(this);
  }
}
