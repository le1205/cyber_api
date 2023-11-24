/// <reference types="multer" />
import { AppService } from './app.service';
import { SearchCourse } from './objects/course/dto/create-course.dto';
import { CreateChatDto, CreateChatMessageDto } from './objects/chats/dto/create-chat.dto';
import { CreateQuizDto } from './objects/course/entities/course.entity';
import { CreateUserDto } from './objects/user/dto/create-user.dto';
import { AuthService } from './jwt-auth/auth.service';
import { UserService } from './objects/user/user.service';
export declare class AppController {
    private readonly appService;
    private authService;
    private userService;
    constructor(appService: AppService, authService: AuthService, userService: UserService);
    getAllCourses(): Promise<import("./objects/course/entities/course.entity").Course[]>;
    getAllCategories(): Promise<import("./objects/course/entities/course.entity").CourseCategory[]>;
    getCoursesByCategoryId(id: number): Promise<void>;
    getIsEnrolled(id: number, user: {
        userId: any;
    }): Promise<boolean>;
    getUserInfo(user: {
        userId: any;
    }): Promise<import("./objects/user/entities/user.entity").User>;
    getAllTeachers(): Promise<import("./objects/user/entities/user.entity").User[]>;
    getChatList(user: any): Promise<import("./objects/chats/entities/chat.entity").Chat[]>;
    getChatMessageList(chatId: number, user: any): Promise<import("./objects/chats/entities/chat.entity").ChatMessage[]>;
    createCourseQuiz(courseId: number, body: CreateQuizDto): Promise<import("./objects/course/entities/course.entity").Quiz>;
    getCourseQuizes(courseId: number, user: any): Promise<{
        is_completed: boolean;
        id: number;
        created: Date;
        updated: Date;
        title: string;
        time: number;
        status: boolean;
        course: import("./objects/course/entities/course.entity").Course;
        courseId: number;
        questions: import("./objects/course/entities/course.entity").IQuestions[];
    }[]>;
    uploadHomework(file: Express.Multer.File, user: any, courseId: number): Promise<import("./objects/course/entities/course-homework.entity").CourseHomeWork>;
    applyAttendants(user: any, body: any): Promise<import("./objects/course/entities/course-attendents.entity").CourseAttendants>;
    getAllUpcomingEvents(): Promise<import("./objects/events/entities/event.entity").Event[]>;
    getMyQuizes(user: any): Promise<import("./objects/course/entities/course.entity").QuizData[]>;
    startQuiz(quizId: number, user: any): Promise<import("./objects/course/entities/course.entity").QuizData>;
    finishQuiz(quizId: number, user: any, body: any): Promise<import("./objects/course/entities/course.entity").QuizData>;
    getLastMessages(chatId: number, user: any, body: any): Promise<import("./objects/chats/entities/chat.entity").ChatMessage[]>;
    getPopulerCourses(): Promise<any>;
    sendChatMessage(body: CreateChatMessageDto, user: any, req: any): Promise<{
        message: string;
    }>;
    createNewChat(body: CreateChatDto, user: any): Promise<import("./objects/chats/entities/chat.entity").Chat>;
    getCourseById(id: number): Promise<import("./objects/course/entities/course.entity").Course>;
    searchCourse(search: SearchCourse): Promise<any[]>;
    getAllServices(): Promise<import("./objects/services/entities/service.entity").Service[]>;
    getMyCourses(user: {
        userId: any;
    }): Promise<import("./objects/course/entities/user-course-item.entity").UserCourseItem[]>;
    enrollCourse(body: any, user: any): Promise<import("./objects/course/entities/user-course-item.entity").UserCourseItem>;
    updatePassword(body: any, user: any): Promise<import("./objects/user/entities/user.entity").User>;
    resetPassword(user: {
        userId: any;
    }): Promise<{
        message: string;
    }>;
    dump(): Promise<{
        message: string;
    }>;
    validateUser(body: CreateUserDto): Promise<any>;
    getSettings(): Promise<import("./objects/settings/entities/setting.entity").Setting>;
    getRapors(): Promise<{
        serviceCount: number;
        teacherCount: number;
        courseCount: number;
        studentCount: number;
    }>;
    uploadFile(file: Express.Multer.File): {
        file: string;
    };
    updateProfilePicture(file: Express.Multer.File, user: any): Promise<{
        message: string;
    }>;
}
