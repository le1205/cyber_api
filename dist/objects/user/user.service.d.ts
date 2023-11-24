import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    constructor();
    create(createAdminDto: CreateUserDto): string;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    update(id: number, updateAdminDto: UpdateUserDto): string;
    remove(id: number): string;
    updatePassword(body: {
        old_password: string;
        new_password: string;
        id: number;
        email: string;
    }): Promise<import("typeorm").UpdateResult>;
    validate(adminDto: any): Promise<NotFoundException | User>;
    createUser(user: any): Promise<User>;
    findUsers(): Promise<User[]>;
    findUserById(userId: number): Promise<User>;
    updateUser(user: any): Promise<User>;
}
