import { Course } from 'src/objects/course/entities/course.entity';
import { User } from 'src/objects/user/entities/user.entity';
import { BaseEntity } from 'typeorm';
export declare class Chat extends BaseEntity {
    id: number;
    created: Date;
    title: string;
    get image(): string;
    banner_image: string;
    updated: Date;
    is_deleted: boolean;
    readonly: boolean;
    users: User[];
    chatMessages: ChatMessage[];
    get participants(): {
        id: number;
        fullName: string;
        picture: string;
        isTeacher: boolean;
    }[];
    course: Course;
    courseId: number;
    toJSON(): Record<string, any>;
}
export declare class ChatMessage extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    user: User;
    message: string;
    chat: Chat;
    get sender(): {
        id: any;
        name: any;
        isTeacher: boolean;
        email: any;
        fullName?: undefined;
        picture?: undefined;
    } | {
        id: number;
        fullName: string;
        isTeacher: boolean;
        email: string;
        picture: string;
        name?: undefined;
    };
    toJSON(): Record<string, any>;
    userId: number;
    chatId: number;
}
