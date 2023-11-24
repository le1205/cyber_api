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
exports.CourseHomeWork = void 0;
const class_transformer_1 = require("class-transformer");
const config_1 = require("../../../config");
const typeorm_1 = require("typeorm");
let CourseHomeWork = class CourseHomeWork extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    userId;
    courseId;
    file;
    get fileUrl() {
        return config_1.UPLOAD_URL + this.file;
    }
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseHomeWork.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CourseHomeWork.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CourseHomeWork.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseHomeWork.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseHomeWork.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseHomeWork.prototype, "file", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CourseHomeWork.prototype, "fileUrl", null);
CourseHomeWork = __decorate([
    (0, typeorm_1.Entity)('course_homeworks')
], CourseHomeWork);
exports.CourseHomeWork = CourseHomeWork;
