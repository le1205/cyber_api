/// <reference types="multer" />
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/jwt-auth/auth.service';
export declare class UserController {
    private readonly userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    validateUser(body: CreateUserDto): Promise<any>;
    changePass(body: any): Promise<import("typeorm").UpdateResult>;
    refreshToken(req: any): Promise<{
        user: {
            name: any;
            lastname: any;
            email: any;
        };
        token: {
            refresh_token?: string;
            access_token: string;
        };
    }>;
    createUser(user: any): Promise<import("./entities/user.entity").User>;
    updateUser(user: any): Promise<import("./entities/user.entity").User>;
    getUserById(userId: any): Promise<import("./entities/user.entity").User>;
    uploadUserImage(file: Express.Multer.File, id: string): Promise<import("./entities/user.entity").User>;
}
