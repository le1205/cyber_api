import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import { Course } from 'src/objects/course/entities/course.entity';
import { UserCourseItem } from 'src/objects/course/entities/user-course-item.entity';
import { Chat, ChatMessage } from 'src/objects/chats/entities/chat.entity';
import { UPLOAD_URL } from 'src/config';

export enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher'
}

@Entity()
export class User extends BaseEntity {
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

  @Column({ default: '', nullable: true })
  lastname: string;


  @Expose()
  get fullName() {
    return this.name + ' ' + (this.lastname ?? '');
  }

  @Expose()
  get courseCount() {
    return this.userCourseItems?.length ?? 0;
  }

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToMany((type) => Chat, (type) => type.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  chats: Chat[];

  @OneToMany((type) => UserCourseItem, (userCourseItem) => userCourseItem.user, {
    cascade: true
  })
  @JoinColumn()
  userCourseItems: UserCourseItem[];

  @OneToMany((type) => ChatMessage, (chatMessage) => chatMessage.user)
  chatMessages: ChatMessage[];

  @Column({ nullable: true })
  @Exclude()
  picture_image: string;

  @Expose()
  get picture() {
    return UPLOAD_URL + this.picture_image;
  }

  toJSON() {
    return classToPlain(this);
  }

  @Column({ nullable: true })
  pushNotificationToken: string;

  @Column({ default: Role.STUDENT })
  role: Role

  @Column({ default: 5.0 })
  rating: number;
}

