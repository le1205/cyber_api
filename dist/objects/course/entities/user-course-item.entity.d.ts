import { BaseEntity } from 'typeorm';
import { Course } from './course.entity';
import { User } from 'src/objects/user/entities/user.entity';
export declare enum ECourseItem {
    none = 0,
    waiting = 1,
    approved = 2,
    rejected = 3
}
export declare class UserCourseItem extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    course: Course;
    user: User;
    courseId: number;
    get chatId(): number;
    userId: number;
    status: ECourseItem;
    certificated: boolean;
    certificateNo: string;
    toJSON(): Record<string, any>;
}
