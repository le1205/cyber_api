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
exports.CreateQuizDto = exports.QuizData = exports.Quiz = exports.CourseLesson = exports.CourseCategory = exports.Course = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../user/entities/user.entity");
const user_course_item_entity_1 = require("./user-course-item.entity");
const chat_entity_1 = require("../../chats/entities/chat.entity");
const config_1 = require("../../../config");
let Course = class Course extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    title;
    status;
    feature_banner_image;
    get feature_banner() {
        if (!this.feature_banner_image)
            return;
        return config_1.UPLOAD_URL + this.feature_banner_image;
    }
    students;
    chat;
    chatId;
    quizes;
    faqs;
    price;
    duration;
    hour_duration;
    perweek;
    rate;
    is_featured;
    is_editor_choice;
    is_recommended_choice;
    description;
    icon;
    sections;
    lessons;
    live;
    outlines;
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
    get studentIds() {
        if (!this.students)
            return;
        return [...this.students?.filter(us => us.user?.role == user_entity_1.Role.STUDENT).map((student) => student.userId)];
    }
    get teacherIds() {
        if (!this.students)
            return;
        return [...this.students?.filter(el => el.user?.role == user_entity_1.Role.TEACHER).map((student) => student.userId)];
    }
    get lessonIds() {
        if (!this.lessons)
            return;
        return [...this.lessons?.map((cat) => cat.id)];
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "feature_banner_image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Course.prototype, "feature_banner", null);
__decorate([
    (0, typeorm_1.OneToMany)((type) => user_course_item_entity_1.UserCourseItem, (user) => user.course, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Course.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => chat_entity_1.Chat, (chat) => chat.course, {}),
    (0, typeorm_1.JoinColumn)({ name: 'chatId' }),
    __metadata("design:type", chat_entity_1.Chat)
], Course.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Quiz, (quiz) => quiz.course),
    __metadata("design:type", Array)
], Course.prototype, "quizes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], Course.prototype, "faqs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "hour_duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "perweek", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 5, update: false }),
    __metadata("design:type", Number)
], Course.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Course.prototype, "is_featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "is_editor_choice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "is_recommended_choice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => CourseLesson, (lesson) => lesson.course, {
        eager: true,
        cascade: ['insert'],
    }),
    (0, typeorm_1.JoinTable)(),
    (0, class_transformer_1.Exclude)({ toClassOnly: true }),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "live", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "outlines", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Course.prototype, "studentIds", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Course.prototype, "teacherIds", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Course.prototype, "lessonIds", null);
Course = __decorate([
    (0, typeorm_1.Entity)('courses')
], Course);
exports.Course = Course;
let CourseCategory = class CourseCategory extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    title;
    status;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CourseCategory.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CourseCategory.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CourseCategory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CourseCategory.prototype, "status", void 0);
CourseCategory = __decorate([
    (0, typeorm_1.Entity)('course_categories')
], CourseCategory);
exports.CourseCategory = CourseCategory;
let CourseLesson = class CourseLesson extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    title;
    isShowed;
    status;
    time;
    url;
    course;
    courseId;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseLesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CourseLesson.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CourseLesson.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseLesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], CourseLesson.prototype, "isShowed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CourseLesson.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CourseLesson.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CourseLesson.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Course, (course) => course.lessons),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Course)
], CourseLesson.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseLesson.prototype, "courseId", void 0);
CourseLesson = __decorate([
    (0, typeorm_1.Entity)('course_lessons')
], CourseLesson);
exports.CourseLesson = CourseLesson;
let Quiz = class Quiz extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    title;
    time;
    status;
    course;
    courseId;
    toJSON() {
        return (0, class_transformer_1.classToPlain)(this);
    }
    questions;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    __metadata("design:type", Number)
], Quiz.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Quiz.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Course, (course) => course.quizes),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", Course)
], Quiz.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Quiz.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
Quiz = __decorate([
    (0, typeorm_1.Entity)('quizes')
], Quiz);
exports.Quiz = Quiz;
let QuizData = class QuizData extends typeorm_1.BaseEntity {
    id;
    created;
    updated;
    quizId;
    userId;
    is_started;
    is_completed;
    userAnswers;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuizData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizData.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizData.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuizData.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuizData.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuizData.prototype, "is_started", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuizData.prototype, "is_completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], QuizData.prototype, "userAnswers", void 0);
QuizData = __decorate([
    (0, typeorm_1.Entity)('quiz_data')
], QuizData);
exports.QuizData = QuizData;
class CreateQuizDto {
    title;
    time;
    status;
    questions;
    courseId;
    id;
    constructor() {
        this.time = 10;
        this.title = '';
        this.status = true;
        this.questions = [
            {
                answers: [
                    {
                        question_answer: 1,
                        question_number: 1,
                    },
                ],
                currectId: 1,
                question_number: 1,
                id: 1,
                title: 'Title',
            },
        ];
    }
}
exports.CreateQuizDto = CreateQuizDto;
