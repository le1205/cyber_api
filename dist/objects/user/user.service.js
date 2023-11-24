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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor() { }
    create(createAdminDto) {
        return 'This action adds a new admin';
    }
    findAll() {
        return user_entity_1.User.find({
            where: {
                role: user_entity_1.Role.STUDENT
            }
        });
    }
    async findOne(email) {
        return user_entity_1.User.findOne({
            where: {
                email: email,
                is_active: true
            },
            select: ['id', 'email', 'password', 'name'],
        });
    }
    update(id, updateAdminDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
    async updatePassword(body) {
        const user = await user_entity_1.User.findOne({
            where: {
                id: body.id,
                email: body.email,
                password: body.old_password,
            },
        });
        if (user) {
            return user_entity_1.User.update({
                id: body.id,
                email: body.email,
            }, {
                password: body.new_password,
            });
        }
        else {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async validate(adminDto) {
        const user = await user_entity_1.User.findOne({
            where: {
                email: adminDto.email,
                password: adminDto.password,
            },
        });
        if (!user)
            return new common_1.NotFoundException();
        return user;
    }
    async createUser(user) {
        return user_entity_1.User.save({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
            is_active: user.is_active,
            role: user_entity_1.Role.STUDENT
        });
    }
    findUsers() {
        return user_entity_1.User.find({
            where: {
                role: user_entity_1.Role.STUDENT
            }
        });
    }
    async findUserById(userId) {
        return user_entity_1.User.findOne({
            where: { id: userId, role: user_entity_1.Role.STUDENT }
        });
    }
    async updateUser(user) {
        let data = await this.findUserById(user.id);
        await user_entity_1.User.update(data.id, {
            name: user.name ?? data.name,
            is_active: user.is_active ?? data.is_active,
            lastname: user.lastname ?? data.lastname,
            email: user.email ?? data.email,
            picture_image: user.picture_image ?? data.picture_image
        });
        if (user.is_active == false) {
            await user_entity_1.User.query("DELETE FROM `user_chats` WHERE  `user_id` = '" + data.id + "'");
        }
        return this.findUserById(data.id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
