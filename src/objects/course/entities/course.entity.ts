import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
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
import { CourseFaqs, ICourseSection } from '../dto/create-course.dto';
import { Exclude, Expose, classToPlain } from 'class-transformer';
import { Role, User } from 'src/objects/user/entities/user.entity';
import { UserCourseItem } from './user-course-item.entity';
import { Chat, ChatMessage } from 'src/objects/chats/entities/chat.entity';
import { UPLOAD_URL } from 'src/config';

@Entity('courses')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'text', nullable: true })
  feature_banner_image: string;

  @Expose()
  get feature_banner() {
    if(!this.feature_banner_image) return;
    return UPLOAD_URL + this.feature_banner_image;
  }

  @OneToMany((type) => UserCourseItem, (user) => user.course, {
      eager: true
  })
  @JoinColumn()
  students: UserCourseItem[];

  @OneToOne((type) => Chat, (chat) => chat.course, {
  })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Column({ unique: true, nullable: true })
  chatId: number;

  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizes: Quiz[];

  @Column({ type: 'json' })
  faqs: CourseFaqs[];

  @Column()
  price: number;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  hour_duration: string;

  @Column({ nullable: true })
  perweek: string;

  @Column({ default: 5, update: false })
  rate: number;

  @Column({ default: true })
  is_featured: boolean;

  @Column({ default: false })
  is_editor_choice: boolean;

  @Column({ default: false })
  is_recommended_choice: boolean;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ type: 'json', nullable: true })
  sections?: ICourseSection[];

  @OneToMany((type) => CourseLesson, (lesson) => lesson.course, {
    eager: true,
    cascade: ['insert'],
  })
  @JoinTable()
  @Exclude({ toClassOnly: true })
  lessons: CourseLesson[];

  @Column({ type: 'json', nullable: true })
  live: ILive;

  @Column({ type: 'json', nullable: true })
  outlines: string[];

  toJSON() {
    return classToPlain(this);
  }

  @Expose()
  get studentIds() {
    if (!this.students) return;
    return [...this.students?.filter(us => us.user?.role == Role.STUDENT).map((student) => student.userId)];
  }

  @Expose()
  get teacherIds() {
    if (!this.students) return;
    return [...this.students?.filter(el => el.user?.role == Role.TEACHER).map((student) => student.userId)]
  }

  @Expose()
  get lessonIds() {
    if (!this.lessons) return;
    return [...this.lessons?.map((cat) => cat.id)];
  }
}

@Entity('course_categories')
export class CourseCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  // @ManyToMany((type) => Course, (course) => course.course_categories)
  // courses: Course[];
}

// @Entity()
// export class UserCourses extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @CreateDateColumn()
//   created: Date;

//   @UpdateDateColumn()
//   updated: Date;

//   @Manyone

// }

@Entity('course_lessons')
export class CourseLesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  isShowed?: boolean;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  time?: string;

  @Column({ nullable: true })
  url?: string;

  @ManyToOne((type) => Course, (course) => course.lessons)
  @JoinColumn()
  course: Course;

  @Column()
  courseId: number;
}

@Entity('quizes')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  title: string;

  @Column({ default: 10 })
  time: number;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => Course, (course) => course.quizes)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column()
  courseId: number;

  toJSON() {
    return classToPlain(this);
  }

  @Column({ type: 'json', nullable: true })
  questions: IQuestions[];
}

@Entity('quiz_data')
export class QuizData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  quizId: number;

  @Column()
  userId: number;

  @Column({ default: false })
  is_started: boolean;

  @Column({ default: false })
  is_completed: boolean;

  @Column({ type: 'json', nullable: true })
  userAnswers: IUserAnswer[];
}

export interface IQuestions {
  id: number;
  title: string;
  question_number: number;
  currectId: number;
  answers: IAnswer[];
}

export interface IAnswer {
  question_number: number;
  question_answer: any;
}

export interface IUserAnswer {
  question_number: number;
  question_answer: number;
}

interface ILive {
  url?: string;
  is_started?: boolean;
}

export class CreateQuizDto {
  title: string;
  time: number;
  status?: boolean;
  questions: IQuestions[];
  courseId: number;
  readonly id?: number;

  constructor() {
    this.time = 10;
    this.title = '';
    this.status = true;
    this.questions = [
      {
        answers: [
          {
            question_answer: 1,
            question_number: 1,
          },
        ],
        currectId: 1,
        question_number: 1,
        id: 1,
        title: 'Title',
      },
    ];
  }
}
