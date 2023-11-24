import { BaseEntity } from 'typeorm';
export declare class Setting extends BaseEntity {
    id: number;
    created: any;
    updated: any;
    address: string;
    short_about: string;
    email: string[];
    phone: string[];
    fax: any[];
    google_url: string;
    google_embed: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    privacy_policy: string;
    terms_and_conditions: string;
    whatsapp_phone: string;
    main_email: string;
}
