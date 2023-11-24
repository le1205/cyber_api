import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from 'src/objects/user/entities/user.entity';
import { classToPlain, Expose } from 'class-transformer';

export enum ECourseItem {
  none,
  waiting,
  approved,
  rejected,
}

@Entity('user_course_item')
export class UserCourseItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne((type) => Course, (course) => course.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  course: Course;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true
  })
  @JoinColumn()
  user: User;

  @Column()
  courseId: number;

  @Expose()
  get chatId() {
    return this.course?.chatId;
  }

  @Column()
  userId: number;

  @Column({ nullable: true, default: ECourseItem.waiting })
  status: ECourseItem;

  @Column({ default: false })
  certificated: boolean;

  @Column({nullable: true})
  certificateNo: string;

  toJSON() {
    return classToPlain(this);
  }

}
