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
exports.UserCourseItem = exports.ECourseItem = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("./course.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const class_transformer_1 = require("class-transformer");
var ECourseItem;
(function (ECourseItem) {
    ECourseItem[ECourseItem["none"] = 0] = "none";
    ECourseItem[ECourseItem["waiting"] = 1] = "waiting";
    ECourseItem[ECourseItem["approved"] = 2] = "approved";
    ECourseItem[ECourseItem["rejected"] = 3] = "rejected";
})(ECourseItem = exports.ECourseItem || (exports.ECourseItem = {}));
let UserCourseItem = class UserCourseItem extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    course;
    user;
    courseId;
    get chatId() {
        return this.course?.chatId;
    }
    userId;
    status;
    certificated;
    certificateNo;
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserCourseItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserCourseItem.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserCourseItem.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => course_entity_1.Course, (course) => course.id, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", course_entity_1.Course)
], UserCourseItem.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.id, {
        onDelete: 'CASCADE',
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], UserCourseItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserCourseItem.prototype, "courseId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UserCourseItem.prototype, "chatId", null);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserCourseItem.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: ECourseItem.waiting }),
    __metadata("design:type", Number)
], UserCourseItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserCourseItem.prototype, "certificated", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserCourseItem.prototype, "certificateNo", void 0);
UserCourseItem = __decorate([
    (0, typeorm_1.Entity)('user_course_item')
], UserCourseItem);
exports.UserCourseItem = UserCourseItem;
