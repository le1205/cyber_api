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

@Entity('course_attendants')
export class CourseAttendants extends BaseEntity {
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
  attendant_date: Date;

  toJSON() {
    return classToPlain(this);
  }
}
