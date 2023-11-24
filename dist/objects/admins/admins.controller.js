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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../jwt-auth/auth.service");
const jwt_guard_1 = require("../../jwt-auth/jwt.guard");
const user_decorator_1 = require("../../shared/user.decorator");
const admins_service_1 = require("./admins.service");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_admin_dto_1 = require("./dto/update-admin.dto");
let AdminsController = class AdminsController {
    adminsService;
    authService;
    constructor(adminsService, authService) {
        this.adminsService = adminsService;
        this.authService = authService;
    }
    create(createAdminDto) {
        return this.adminsService.create(createAdminDto);
    }
    findAll() {
        return this.adminsService.findAll();
    }
    update(id, updateAdminDto) {
        return this.adminsService.update(+id, updateAdminDto);
    }
    remove(id) {
        return this.adminsService.remove(+id);
    }
    async validateUser(body) {
        console.log(body);
        return this.authService.validateUser(body, this.adminsService);
    }
    changePass(body, user) {
        return this.adminsService.updatePassword(body, user);
    }
    refreshToken(req) {
        return this.authService.refresh(req.token.refresh_token);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "validateUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('password_change'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "changePass", null);
__decorate([
    (0, common_1.Post)('token/refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "refreshToken", null);
AdminsController = __decorate([
    (0, common_1.Controller)('admin-users'),
    __metadata("design:paramtypes", [admins_service_1.AdminsService, auth_service_1.AuthService])
], AdminsController);
exports.AdminsController = AdminsController;
