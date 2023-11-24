import { Expose, classToPlain } from 'class-transformer';
import { UPLOAD_URL } from 'src/config';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('course_homeworks')
export class CourseHomeWork extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  userId: number;

  @Column()
  courseId: number;

  @Column()
  file: string;

  @Expose()
  get fileUrl() {
    return UPLOAD_URL + this.file;
  }
  
  toJSON() {
    return classToPlain(this);
  }
}
