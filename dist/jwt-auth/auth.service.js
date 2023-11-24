"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const admins_service_1 = require("../objects/admins/admins.service");
const constant_1 = require("./constant");
const course_entity_1 = require("../objects/course/entities/course.entity");
const course_service_1 = require("../objects/course/course.service");
const user_service_1 = require("../objects/user/user.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(body, service) {
        const { email, password, remember_me } = body;
        const user = await service.findOne(email);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(user);
        if (user && isMatch) {
            const { password, ...result } = user;
            return this.login(result, remember_me);
        }
        throw new common_1.NotFoundException();
    }
    async login(user, hasRefresh = true) {
        const payload = { email: user.email, sub: user.id, role: user.role ?? 'admin' };
        const access_token = this.jwtService.sign(payload, {
            expiresIn: '144h',
        });
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: '24h',
            secret: constant_1.jwtConstants.refresh_secret,
        });
        return {
            user: {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
            },
            token: {
                access_token: access_token,
                ...(hasRefresh
                    ? {
                        refresh_token: refresh_token,
                    }
                    : {}),
            },
        };
    }
    async refresh(refresh_token) {
        try {
            const user = this.jwtService.verify(refresh_token, {
                secret: constant_1.jwtConstants.refresh_secret,
            });
            return this.login(user);
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admins_service_1.AdminsService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
