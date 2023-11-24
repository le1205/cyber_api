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
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const bcrypt = require("bcrypt");
let AdminsService = class AdminsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(createAdminDto) {
        return 'This action adds a new admin';
    }
    findAll() {
        return `This action returns all admins`;
    }
    findOne(email) {
        return this.repository.findOne({
            where: {
                email: email
            },
            select: ['id', 'email', 'password', 'name']
        });
    }
    update(id, updateAdminDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
    async updatePassword(body, user) {
        console.log(user);
        if (!body.old_password || !body.new_password) {
            throw new common_1.HttpException('Fill required fields', common_1.HttpStatus.BAD_REQUEST);
        }
        const foundedUser = await admin_entity_1.Admin.findOne({
            where: {
                id: user.userId,
                email: user.email,
            },
            select: ['id', 'password', 'name', 'email'],
        });
        if (foundedUser) {
            console.log(foundedUser, body);
            const isPasswordMatched = await bcrypt.compare(body.old_password, foundedUser.password);
            console.log(isPasswordMatched);
            if (isPasswordMatched) {
                await admin_entity_1.Admin.update({
                    id: user.userId,
                    email: user.email,
                }, {
                    password: await bcrypt.hash(body.new_password, 10),
                });
                return await admin_entity_1.Admin.findOne({
                    where: {
                        id: user.userId,
                    },
                });
            }
            else {
                throw new common_1.HttpException('password_wrong', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async validate(adminDto) {
        const user = await this.repository.findOne({
            where: {
                email: adminDto.email,
                password: adminDto.password
            }
        });
        if (!user)
            return new common_1.NotFoundException();
        return user;
    }
};
AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminsService);
exports.AdminsService = AdminsService;
