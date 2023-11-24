import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
export declare class AdminsService {
    private repository;
    constructor(repository: Repository<Admin>);
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    findOne(email: string): Promise<Admin>;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
    updatePassword(body: any, user: {
        userId: number;
        email: string;
    }): Promise<Admin>;
    validate(adminDto: any): Promise<NotFoundException | Admin>;
}
