import { BaseEntity } from 'typeorm';
export declare class Service extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    title: string;
    description: string;
    status: boolean;
    banner_image: string;
    get image(): string;
    toJSON(): Record<string, any>;
}
