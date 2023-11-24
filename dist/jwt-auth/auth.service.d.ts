import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/objects/admins/admins.service';
import { UserService } from 'src/objects/user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: AdminsService, jwtService: JwtService);
    validateUser(body: any, service: AdminsService | UserService): Promise<any>;
    login(user: any, hasRefresh?: boolean): Promise<{
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
    refresh(refresh_token: any): Promise<{
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
}
