import { AuthService } from 'src/jwt-auth/auth.service';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminsController {
    private readonly adminsService;
    private authService;
    constructor(adminsService: AdminsService, authService: AuthService);
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    remove(id: string): string;
    validateUser(body: CreateAdminDto): Promise<any>;
    changePass(body: any, user: any): Promise<import("./entities/admin.entity").Admin>;
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
}
