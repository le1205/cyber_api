"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsModule = void 0;
const common_1 = require("@nestjs/common");
const admins_service_1 = require("./admins.service");
const admins_controller_1 = require("./admins.controller");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const auth_service_1 = require("../../jwt-auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../../jwt-auth/constant");
let AdminsModule = class AdminsModule {
};
AdminsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin]),
            jwt_1.JwtModule.register({
                secret: constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '2h' },
                verifyOptions: {
                    ignoreExpiration: true
                }
            }),
        ],
        controllers: [admins_controller_1.AdminsController],
        providers: [admins_service_1.AdminsService, auth_service_1.AuthService],
        exports: [admins_service_1.AdminsService]
    })
], AdminsModule);
exports.AdminsModule = AdminsModule;
