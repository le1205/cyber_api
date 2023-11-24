import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Service } from './objects/services/entities/service.entity';
import { Setting } from './objects/settings/entities/setting.entity';
import { Course, CourseCategory, CreateQuizDto, Quiz, QuizData } from './objects/course/entities/course.entity';
import { SearchCourse } from './objects/course/dto/create-course.dto';
import { Role, User } from './objects/user/entities/user.entity';
import { UserCourseItem } from './objects/course/entities/user-course-item.entity';
import { Chat, ChatMessage } from './objects/chats/entities/chat.entity';
import { CreateChatDto, CreateChatMessageDto } from './objects/chats/dto/create-chat.dto';
import { CourseHomeWork } from './objects/course/entities/course-homework.entity';
import { CourseAttendants } from './objects/course/entities/course-attendents.entity';
import { Event } from './objects/events/entities/event.entity';
export declare class AppService implements OnModuleInit {
    private courseRepository;
    getAllUpcomingEvents(): Promise<Event[]>;
    constructor(courseRepository: Repository<Course>);
    GetAllCourses(): Promise<Course[]>;
    getAllCategoies(): Promise<CourseCategory[]>;
    getCourseByCategoryId(categoryId: number): Promise<void>;
    getCourseEnrolled(id: number, userId: number): Promise<boolean>;
    getAllChats(userId: any): Promise<Chat[]>;
    createCourseQuiz(courseId: number, body: CreateQuizDto): Promise<Quiz>;
    startQuiz(quizId: any, userId: any): Promise<QuizData>;
    finishQuiz(quizId: any, userId: any, body: any): Promise<QuizData>;
    getMyQuizes(userId: any): Promise<QuizData[]>;
    applyAttendant(userId: any, body: any): Promise<CourseAttendants>;
    getCourseQuizes(courseId: any, userId: any): Promise<{
        is_completed: boolean;
        id: number;
        created: Date;
        updated: Date;
        title: string;
        time: number;
        status: boolean;
        course: Course;
        courseId: number;
        questions: import("./objects/course/entities/course.entity").IQuestions[];
    }[]>;
    getAllChatMessageByChatId(chatId: any, userId: any): Promise<ChatMessage[]>;
    getLastMessage(chatId: any, userId: any, created: Date): Promise<ChatMessage[]>;
    sendMessage(body: Partial<CreateChatMessageDto>, userId: any): Promise<{
        message: string;
    }>;
    sendHomework(filename: any, userId: any, courseId: any): Promise<CourseHomeWork>;
    createNewChat(body: Partial<CreateChatDto>, userId: any): Promise<Chat>;
    GetAllTeachers(): Promise<User[]>;
    getPopulerCourses(): Promise<any>;
    getCourseById(id: number): Promise<Course>;
    getQuizById(id: number): Promise<Quiz>;
    searchCourse(searchParams: SearchCourse): Promise<any[]>;
    getServiceList(): Promise<Service[]>;
    getMyCourses(user: any): Promise<UserCourseItem[]>;
    getUserInfo(userId: any): Promise<User>;
    enrollCourse(body: any, user: {
        userId: any;
        role: Role;
    }): Promise<UserCourseItem>;
    findUserById(userId: number): Promise<User>;
    updatePassword(body: any, user: {
        userId: number;
        email: string;
    }): Promise<User>;
    resetPassword(userId: any): Promise<{
        message: string;
    }>;
    updateProfilePicture(user: {
        userId: number;
    }, fileName: string): Promise<{
        message: string;
    }>;
    dumpCourses(): Promise<{
        message: string;
    }>;
    onModuleInit(): Promise<void>;
    getRapor(): Promise<{
        serviceCount: number;
        teacherCount: number;
        courseCount: number;
        studentCount: number;
    }>;
    settings(): Promise<Setting>;
}
