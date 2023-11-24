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
exports.User = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const course_entity_1 = require("../../course/entities/course.entity");
const user_course_item_entity_1 = require("../../course/entities/user-course-item.entity");
const chat_entity_1 = require("../../chats/entities/chat.entity");
const config_1 = require("../../../config");
var Role;
(function (Role) {
    Role["STUDENT"] = "student";
    Role["TEACHER"] = "teacher";
})(Role = exports.Role || (exports.Role = {}));
let User = class User extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    is_active;
    is_deleted;
    name;
    lastname;
    get fullName() {
        return this.name + ' ' + (this.lastname ?? '');
    }
    get courseCount() {
        return this.userCourseItems?.length ?? 0;
    }
    email;
    password;
    chats;
    userCourseItems;
    chatMessages;
    picture_image;
    get picture() {
        return config_1.UPLOAD_URL + this.picture_image;
    }
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
    pushNotificationToken;
    role;
    rating;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Object)
], User.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Object)
], User.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], User.prototype, "courseCount", null);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => chat_entity_1.Chat, (type) => type.users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => user_course_item_entity_1.UserCourseItem, (userCourseItem) => userCourseItem.user, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "userCourseItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => chat_entity_1.ChatMessage, (chatMessage) => chatMessage.user),
    __metadata("design:type", Array)
], User.prototype, "chatMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "picture_image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], User.prototype, "picture", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "pushNotificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Role.STUDENT }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 5.0 }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
