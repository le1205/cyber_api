import { Exclude, Expose, classToPlain } from 'class-transformer';
import { UPLOAD_URL } from 'src/config';
import { Course } from 'src/objects/course/entities/course.entity';
import { Role, User } from 'src/objects/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @Column()
  title: string;

  @Expose()
  get image() {
    return UPLOAD_URL + this.banner_image
  }

  @Column({nullable: true})
  banner_image: string;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'boolean', default: false })
  readonly: boolean;

  @ManyToMany((type) => User, (user) => user.chats, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @Exclude()
  @JoinTable({
    name: 'user_chats',
    joinColumn: {
      name: 'chat_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany((type) => ChatMessage, (chatMessage) => chatMessage.chat, {})
  chatMessages: ChatMessage[];

  @Expose()
  get participants() {
    console.log(this.users);
    const users = this.users?.map((user) => ({
      id: user.id,
      fullName: user.name + (user.lastname ?? ''),
      picture: user.picture,
      isTeacher: user.role == Role.STUDENT ? false : true,
    })) ?? [];

    return users;
  }

  @OneToOne((type) => Course, (course) => course.chat, {
    nullable: true,
    cascade: true
  })
  @JoinColumn()
  course: Course;

  @Column({ nullable: true })
  courseId: number

  toJSON() {
    return classToPlain(this);
  }
}

@Entity()
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne((type) => User, (user) => user.chatMessages, {
   eager: true
  })
  @JoinColumn()
  @Exclude()
  user: User;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne((type) => Chat, (chat) => chat.chatMessages)
  @JoinColumn()
  chat: Chat;

  @Expose()
  get sender() {
    if (!this.user)
      return {
        id: null,
        name: null,
        isTeacher: false,
        email: null,
      };
    if (this.user.role == Role.TEACHER) {
      return {
        id: this.user.id,
        fullName: this.user.fullName,
        isTeacher: true,
        email: this.user.email,
        picture: this.user.picture?.startsWith('https') ? this.user.picture : (UPLOAD_URL + this.user.picture),
      };
    } else {
      return {
        id: this.user.id,
        fullName: this.user.name + (this.user.lastname ?? ''),
        isTeacher: false,
        email: this.user.email,
        picture: this.user.picture,
      };
    }
  }

  toJSON() {
    return classToPlain(this);
  }

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  chatId: number;
}
