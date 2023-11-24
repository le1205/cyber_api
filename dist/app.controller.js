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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const app_service_1 = require("./app.service");
const file_upload_utils_1 = require("./file-upload.utils");
const user_decorator_1 = require("./shared/user.decorator");
const jwt_guard_1 = require("./jwt-auth/jwt.guard");
const create_chat_dto_1 = require("./objects/chats/dto/create-chat.dto");
const swagger_1 = require("@nestjs/swagger");
const course_entity_1 = require("./objects/course/entities/course.entity");
const create_user_dto_1 = require("./objects/user/dto/create-user.dto");
const auth_service_1 = require("./jwt-auth/auth.service");
const user_service_1 = require("./objects/user/user.service");
let AppController = class AppController {
    appService;
    authService;
    userService;
    constructor(appService, authService, userService) {
        this.appService = appService;
        this.authService = authService;
        this.userService = userService;
    }
    async getAllCourses() {
        return await this.appService.GetAllCourses();
    }
    async getAllCategories() {
        return await this.appService.getAllCategoies();
    }
    getCoursesByCategoryId(id) {
        return this.appService.getCourseByCategoryId(id);
    }
    getIsEnrolled(id, user) {
        return this.appService.getCourseEnrolled(id, user.userId);
    }
    getUserInfo(user) {
        return this.appService.getUserInfo(user.userId);
    }
    async getAllTeachers() {
        return await this.appService.GetAllTeachers();
    }
    getChatList(user) {
        return this.appService.getAllChats(user.userId);
    }
    getChatMessageList(chatId, user) {
        return this.appService.getAllChatMessageByChatId(chatId, user.userId);
    }
    createCourseQuiz(courseId, body) {
        return this.appService.createCourseQuiz(courseId, body);
    }
    getCourseQuizes(courseId, user) {
        return this.appService.getCourseQuizes(courseId, user.userId);
    }
    uploadHomework(file, user, courseId) {
        return this.appService.sendHomework('homeworks/' + file.filename, user.userId, courseId);
    }
    applyAttendants(user, body) {
        console.log(body);
        return this.appService.applyAttendant(user.userId, body);
    }
    getAllUpcomingEvents() {
        return this.appService.getAllUpcomingEvents();
    }
    getMyQuizes(user) {
        return this.appService.getMyQuizes(user.userId);
    }
    startQuiz(quizId, user) {
        return this.appService.startQuiz(quizId, user.userId);
    }
    finishQuiz(quizId, user, body) {
        return this.appService.finishQuiz(quizId, user.userId, body);
    }
    getLastMessages(chatId, user, body) {
        return this.appService.getLastMessage(chatId, user.userId, body.created);
    }
    getPopulerCourses() {
        return this.appService.getPopulerCourses();
    }
    sendChatMessage(body, user, req) {
        console.log(req);
        return this.appService.sendMessage(body, user.userId);
    }
    createNewChat(body, user) {
        return this.appService.createNewChat(body, user.userId);
    }
    getCourseById(id) {
        return this.appService.getCourseById(id);
    }
    searchCourse(search) {
        return this.appService.searchCourse(search);
    }
    getAllServices() {
        return this.appService.getServiceList();
    }
    getMyCourses(user) {
        return this.appService.getMyCourses(user);
    }
    enrollCourse(body, user) {
        return this.appService.enrollCourse(body, user);
    }
    updatePassword(body, user) {
        return this.appService.updatePassword(body, user);
    }
    resetPassword(user) {
        return this.appService.resetPassword(user.userId);
    }
    dump() {
        return this.appService.dumpCourses();
    }
    async validateUser(body) {
        console.log(body);
        return this.authService.validateUser(body, this.userService);
    }
    getSettings() {
        return this.appService.settings();
    }
    getRapors() {
        return this.appService.getRapor();
    }
    uploadFile(file) {
        return {
            file: file.filename,
        };
    }
    updateProfilePicture(file, user) {
        console.log(user, file.filename);
        return this.appService.updateProfilePicture(user, file.filename);
    }
};
__decorate([
    (0, common_1.Get)('course-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)('category-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('course-list/:categoryId'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCoursesByCategoryId", null);
__decorate([
    (0, common_1.Get)('course/is-enrolled/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getIsEnrolled", null);
__decorate([
    (0, common_1.Get)('user-info'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('teacher-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllTeachers", null);
__decorate([
    (0, common_1.Get)('chat-list'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getChatList", null);
__decorate([
    (0, common_1.Get)('chat/:chatId/message-list'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getChatMessageList", null);
__decorate([
    (0, common_1.Post)('quiz/create-quiz/:courseId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            example: new course_entity_1.CreateQuizDto(),
        },
    }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, course_entity_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCourseQuiz", null);
__decorate([
    (0, common_1.Get)('quiz/course-quizes/:courseId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCourseQuizes", null);
__decorate([
    (0, common_1.Post)('course/send-homework/:courseId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(__dirname, '..', 'uploads', 'homeworks'),
            filename: file_upload_utils_1.editHomeworkName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __param(2, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadHomework", null);
__decorate([
    (0, common_1.Post)('course/apply-attendant'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "applyAttendants", null);
__decorate([
    (0, common_1.Get)('upcoming-events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllUpcomingEvents", null);
__decorate([
    (0, common_1.Get)('quiz/my-quizes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMyQuizes", null);
__decorate([
    (0, common_1.Get)('quiz/start-quiz/:quizId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "startQuiz", null);
__decorate([
    (0, common_1.Post)('quiz/finish-quiz/:quizId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            example: {
                quizAnswers: [
                    {
                        question_number: 1,
                        question_answer: 1,
                    },
                ],
            },
        },
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "finishQuiz", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            example: {
                created: new Date(),
            },
        },
    }),
    (0, common_1.Post)('chat/:chatId/last-messages'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLastMessages", null);
__decorate([
    (0, common_1.Get)('populer-courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPopulerCourses", null);
__decorate([
    (0, common_1.Post)('chat/new-message'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            example: new create_chat_dto_1.CreateChatMessageDto(),
        },
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatMessageDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sendChatMessage", null);
__decorate([
    (0, common_1.Post)('chat/new-group'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createNewChat", null);
__decorate([
    (0, common_1.Get)('course-detail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Post)('course-search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "searchCourse", null);
__decorate([
    (0, common_1.Get)('service-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Get)('my-course'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMyCourses", null);
__decorate([
    (0, common_1.Post)('enroll-course'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "enrollCourse", null);
__decorate([
    (0, common_1.Post)('update-password'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)('reset-password'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('dump-course'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "dump", null);
__decorate([
    (0, common_1.Post)('user/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "validateUser", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Get)('rapor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRapors", null);
__decorate([
    (0, common_1.Post)('image-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(__dirname, '..', 'uploads'),
            filename: file_upload_utils_1.editImageName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('profile-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(__dirname, '..', 'uploads'),
            filename: file_upload_utils_1.editImageName,
        }),
    })),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateProfilePicture", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, auth_service_1.AuthService, user_service_1.UserService])
], AppController);
exports.AppController = AppController;
