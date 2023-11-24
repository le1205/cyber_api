import { BaseEntity } from 'typeorm';
import { CourseFaqs, ICourseSection } from '../dto/create-course.dto';
import { UserCourseItem } from './user-course-item.entity';
import { Chat } from 'src/objects/chats/entities/chat.entity';
export declare class Course extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    title: string;
    status: boolean;
    feature_banner_image: string;
    get feature_banner(): string;
    students: UserCourseItem[];
    chat: Chat;
    chatId: number;
    quizes: Quiz[];
    faqs: CourseFaqs[];
    price: number;
    duration: string;
    hour_duration: string;
    perweek: string;
    rate: number;
    is_featured: boolean;
    is_editor_choice: boolean;
    is_recommended_choice: boolean;
    description?: string;
    icon?: string;
    sections?: ICourseSection[];
    lessons: CourseLesson[];
    live: ILive;
    outlines: string[];
    toJSON(): Record<string, any>;
    get studentIds(): number[];
    get teacherIds(): number[];
    get lessonIds(): number[];
}
export declare class CourseCategory extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    title: string;
    status: boolean;
}
export declare class CourseLesson extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    title: string;
    isShowed?: boolean;
    status: boolean;
    time?: string;
    url?: string;
    course: Course;
    courseId: number;
}
export declare class Quiz extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    title: string;
    time: number;
    status: boolean;
    course: Course;
    courseId: number;
    toJSON(): Record<string, any>;
    questions: IQuestions[];
}
export declare class QuizData extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    quizId: number;
    userId: number;
    is_started: boolean;
    is_completed: boolean;
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
export declare class CreateQuizDto {
    title: string;
    time: number;
    status?: boolean;
    questions: IQuestions[];
    courseId: number;
    readonly id?: number;
    constructor();
}
export {};
