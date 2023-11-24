import { BaseEntity } from 'typeorm';
import { UserCourseItem } from 'src/objects/course/entities/user-course-item.entity';
import { Chat, ChatMessage } from 'src/objects/chats/entities/chat.entity';
export declare enum Role {
    STUDENT = "student",
    TEACHER = "teacher"
}
export declare class User extends BaseEntity {
    id: number;
    created: any;
    updated: any;
    is_active: boolean;
    is_deleted: boolean;
    name: string;
    lastname: string;
    get fullName(): string;
    get courseCount(): number;
    email: string;
    password: string;
    chats: Chat[];
    userCourseItems: UserCourseItem[];
    chatMessages: ChatMessage[];
    picture_image: string;
    get picture(): string;
    toJSON(): Record<string, any>;
    pushNotificationToken: string;
    role: Role;
    rating: number;
}
