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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const file_upload_utils_1 = require("../../file-upload.utils");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const course_entity_1 = require("./entities/course.entity");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    create(createCourseDto) {
        return this.courseService.create(createCourseDto);
    }
    getAllUserCourses() {
        return this.courseService.getAllUserCourses();
    }
    updateCourseItemStatus(courseItemId, body) {
        return this.courseService.updateCourseItemStatus(courseItemId, body);
    }
    uploadFile(file, id) {
        console.log(file.filename);
        return this.courseService.updateResim(id, {
            feature_banner_image: 'courses/' + file.filename,
        });
    }
    getAllHomeworks() {
        return this.courseService.getAllHomeworks();
    }
    getAllAttendees() {
        return this.courseService.getAllAttendees();
    }
    getAllLessons() {
        return this.courseService.getAllLessons();
    }
    createLesson(lesson) {
        return this.courseService.createLesson(lesson);
    }
    updateLesson(lesson) {
        return this.courseService.updateLesson(lesson);
    }
    deleteLesson(lessonId) {
        return this.courseService.deleteLesson(lessonId);
    }
    findTeachers() {
        return this.courseService.findTeachers();
    }
    createTeacher(teacher) {
        return this.courseService.createTeacher(teacher);
    }
    updateTeacher(teacher) {
        return this.courseService.updateTeacher(teacher);
    }
    getTeacherById(teacherId) {
        return this.courseService.findTeacherById(teacherId);
    }
    uploadTeacherImage(file, id) {
        console.log(file.filename);
        return this.updateTeacher({
            id,
            picture_image: 'teachers/' + file.filename,
        });
    }
    uploadFiles(files, id) {
        return this.courseService.updateResim(id, {
            outlines: [...files.map(file => file.filename)],
        });
    }
    findQuiz() {
        return this.courseService.findQuiz();
    }
    createQuiz(quiz) {
        return this.courseService.createQuiz(quiz);
    }
    updateQuiz(quiz) {
        return this.courseService.updateQuiz(quiz);
    }
    remove(id) {
        return this.courseService.remove(+id);
    }
    update(id, updateCourseDto) {
        return this.courseService.update(+id, updateCourseDto);
    }
    findOne(id) {
        return this.courseService.findOne(+id);
    }
    findAll() {
        return this.courseService.findAll();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user-courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllUserCourses", null);
__decorate([
    (0, common_1.Patch)('user-courses/:courseItemId'),
    __param(0, (0, common_1.Param)('courseItemId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateCourseItemStatus", null);
__decorate([
    (0, common_1.Patch)('image/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/courses/',
            filename: file_upload_utils_1.editCourseName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('homeworks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllHomeworks", null);
__decorate([
    (0, common_1.Get)('attendees'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllAttendees", null);
__decorate([
    (0, common_1.Get)('lessons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllLessons", null);
__decorate([
    (0, common_1.Post)("lessons/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Patch)("lessons/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)("lessons/remove/:lessonId"),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Get)('teacher'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findTeachers", null);
__decorate([
    (0, swagger_1.ApiBody)({
        schema: {
            example: {}
        }
    }),
    (0, common_1.Post)("teacher/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createTeacher", null);
__decorate([
    (0, common_1.Patch)("teacher/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateTeacher", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getTeacherById", null);
__decorate([
    (0, common_1.Patch)('image/teacher/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/teachers/',
            filename: file_upload_utils_1.editCourseName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "uploadTeacherImage", null);
__decorate([
    (0, common_1.Patch)('images/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/',
            filename: file_upload_utils_1.editImageName
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Get)("quiz"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findQuiz", null);
__decorate([
    (0, common_1.Post)("quiz/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_entity_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Patch)("quiz/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_entity_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "updateQuiz", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findAll", null);
CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
