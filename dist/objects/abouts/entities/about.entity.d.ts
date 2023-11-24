import { BaseEntity } from 'typeorm';
export declare class About extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    baslik: string;
    durum: boolean;
    one_cikan_resim: string;
    slug: string;
    icerik: string;
    createSlug(): Promise<void>;
}
