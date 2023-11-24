import { BaseEntity } from 'typeorm';
export declare class CourseAttendants extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    userId: number;
    courseId: number;
    attendant_date: Date;
    toJSON(): Record<string, any>;
}
