import { BaseEntity } from "typeorm";
export declare class Event extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    title: string;
    description: string;
    image?: string;
    status?: boolean;
    get image_url(): string;
    toJSON(): Record<string, any>;
}
