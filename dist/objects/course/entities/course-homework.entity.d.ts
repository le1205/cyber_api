import { BaseEntity } from 'typeorm';
export declare class CourseHomeWork extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    userId: number;
    courseId: number;
    file: string;
    get fileUrl(): string;
    toJSON(): Record<string, any>;
}
