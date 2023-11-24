import { BaseEntity } from "typeorm";
export declare class Admin extends BaseEntity {
    id: number;
    created: any;
    updated: any;
    is_active: boolean;
    is_deleted: boolean;
    name: string;
    lastname: string;
    email: string;
    password: string;
}
