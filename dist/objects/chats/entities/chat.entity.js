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
exports.ChatMessage = exports.Chat = void 0;
const class_transformer_1 = require("class-transformer");
const config_1 = require("../../../config");
const course_entity_1 = require("../../course/entities/course.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Chat = class Chat extends typeorm_1.BaseEntity {
    id;
    created;
    title;
    get image() {
        return config_1.UPLOAD_URL + this.banner_image;
    }
    banner_image;
    updated;
    is_deleted;
    readonly;
    users;
    chatMessages;
    get participants() {
        console.log(this.users);
        const users = this.users?.map((user) => ({
            id: user.id,
            fullName: user.name + (user.lastname ?? ''),
            picture: user.picture,
            isTeacher: user.role == user_entity_1.Role.STUDENT ? false : true,
        })) ?? [];
        return users;
    }
    course;
    courseId;
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Chat.prototype, "image", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "banner_image", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "readonly", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => user_entity_1.User, (user) => user.chats, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.JoinTable)({
        name: 'user_chats',
        joinColumn: {
            name: 'chat_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Chat.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => ChatMessage, (chatMessage) => chatMessage.chat, {}),
    __metadata("design:type", Array)
], Chat.prototype, "chatMessages", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Chat.prototype, "participants", null);
__decorate([
    (0, typeorm_1.OneToOne)((type) => course_entity_1.Course, (course) => course.chat, {
        nullable: true,
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", course_entity_1.Course)
], Chat.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Chat.prototype, "courseId", void 0);
Chat = __decorate([
    (0, typeorm_1.Entity)()
], Chat);
exports.Chat = Chat;
let ChatMessage = class ChatMessage extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    user;
    message;
    chat;
    get sender() {
        if (!this.user)
            return {
                id: null,
                name: null,
                isTeacher: false,
                email: null,
            };
        if (this.user.role == user_entity_1.Role.TEACHER) {
            return {
                id: this.user.id,
                fullName: this.user.fullName,
                isTeacher: true,
                email: this.user.email,
                picture: this.user.picture?.startsWith('https') ? this.user.picture : (config_1.UPLOAD_URL + this.user.picture),
            };
        }
        else {
            return {
                id: this.user.id,
                fullName: this.user.name + (this.user.lastname ?? ''),
                isTeacher: false,
                email: this.user.email,
                picture: this.user.picture,
            };
        }
    }
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
    userId;
    chatId;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatMessage.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChatMessage.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.chatMessages, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", user_entity_1.User)
], ChatMessage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Chat, (chat) => chat.chatMessages),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Chat)
], ChatMessage.prototype, "chat", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ChatMessage.prototype, "sender", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatMessage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatMessage.prototype, "chatId", void 0);
ChatMessage = __decorate([
    (0, typeorm_1.Entity)()
], ChatMessage);
exports.ChatMessage = ChatMessage;
