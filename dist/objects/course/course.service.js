"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const chat_entity_1 = require("../chats/entities/chat.entity");
const user_entity_1 = require("../user/entities/user.entity");
const course_attendents_entity_1 = require("./entities/course-attendents.entity");
const course_homework_entity_1 = require("./entities/course-homework.entity");
const course_entity_1 = require("./entities/course.entity");
const user_course_item_entity_1 = require("./entities/user-course-item.entity");
let CourseService = class CourseService {
    getAllAttendees() {
        return course_attendents_entity_1.CourseAttendants.find();
    }
    getAllHomeworks() {
        return course_homework_entity_1.CourseHomeWork.find();
    }
    async create(createCourseDto) {
        const course = await course_entity_1.Course.save({
            title: createCourseDto.title,
            duration: createCourseDto.duration,
            hour_duration: createCourseDto.hour_duration,
            faqs: createCourseDto.faqs,
            is_editor_choice: createCourseDto.is_editor_choice,
            is_featured: createCourseDto.is_featured,
            is_recommended_choice: createCourseDto.is_recommended_choice,
            live: createCourseDto.live,
            outlines: createCourseDto.outlines,
            perweek: createCourseDto.perweek,
            price: createCourseDto.price,
            rate: createCourseDto.rate,
            status: createCourseDto.status,
            sections: createCourseDto.sections,
            description: createCourseDto.description,
            students: []
        });
        const chat = await chat_entity_1.Chat.save({
            courseId: course.id,
            title: course.title + ' Groups',
            banner_image: course.feature_banner
        });
        await course_entity_1.Course.update({
            id: course.id
        }, {
            chatId: chat.id
        });
        const teachers = await user_entity_1.User.findByIds(createCourseDto.teacherIds);
        const createdItem = [];
        for await (const teacher of teachers) {
            let tc = await user_course_item_entity_1.UserCourseItem.save({
                chatId: chat.id,
                courseId: course.id,
                userId: teacher.id
            });
            createdItem.push(tc);
        }
        console.log(createdItem);
        course.students.push(...createdItem);
        await course_entity_1.Course.save({
            ...course,
        });
        return course_entity_1.Course.findOne(course.id);
        try {
        }
        catch (error) {
            throw new common_1.HttpException('bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findAll() {
        return course_entity_1.Course.find({
            relations: ["students"]
        });
    }
    findOne(id) {
        return course_entity_1.Course.findOne({
            where: {
                id,
            }, relations: ["students"]
        });
    }
    async update(id, updateCourseDto) {
        let data = await this.findOne(id);
        const course = await course_entity_1.Course.save({
            id,
            title: updateCourseDto.title ?? data.title,
            duration: updateCourseDto.duration ?? updateCourseDto.duration,
            hour_duration: updateCourseDto.hour_duration ?? updateCourseDto.hour_duration,
            faqs: updateCourseDto.faqs ?? updateCourseDto.faqs,
            is_editor_choice: updateCourseDto.is_editor_choice ?? updateCourseDto.is_editor_choice,
            is_featured: updateCourseDto.is_featured ?? updateCourseDto.is_featured,
            is_recommended_choice: updateCourseDto.is_recommended_choice ?? updateCourseDto.is_recommended_choice,
            live: updateCourseDto.live ?? updateCourseDto.live,
            outlines: updateCourseDto.outlines ?? updateCourseDto.outlines,
            perweek: updateCourseDto.perweek ?? updateCourseDto.perweek,
            price: updateCourseDto.price ?? updateCourseDto.price,
            rate: updateCourseDto.rate ?? updateCourseDto.rate,
            status: updateCourseDto.status ?? updateCourseDto.status,
            sections: updateCourseDto.sections ?? updateCourseDto.sections,
            description: updateCourseDto.description ?? updateCourseDto.description,
        });
        const courseWTeacher = await this.findOne(course.id);
        const deletedTeacher = courseWTeacher.teacherIds.filter(el => !updateCourseDto.teacherIds.includes(el));
        console.log(updateCourseDto.teacherIds);
        const mustCreatedTeacher = await user_entity_1.User.findByIds(updateCourseDto.teacherIds);
        console.log('deleted', deletedTeacher);
        for await (const deletedT of deletedTeacher) {
            await user_course_item_entity_1.UserCourseItem.delete({
                userId: deletedT,
                courseId: course.id
            });
        }
        const createdItem = [];
        for await (const teacher of mustCreatedTeacher) {
            const foundedItem = await user_course_item_entity_1.UserCourseItem.findOne({
                where: {
                    courseId: course.id,
                    userId: teacher.id
                }
            });
            let id = {};
            if (foundedItem) {
                id = { id: foundedItem.id };
            }
            let tc = await user_course_item_entity_1.UserCourseItem.save({
                ...id,
                chatId: course.chatId,
                courseId: course.id,
                userId: teacher.id,
                status: user_course_item_entity_1.ECourseItem.none
            });
            createdItem.push(tc);
        }
        console.log(createdItem);
        courseWTeacher.students.push(...createdItem);
        await course_entity_1.Course.save({
            ...courseWTeacher
        });
        return this.findOne(id);
    }
    async updateResim(id, data) {
        await course_entity_1.Course.update(id, {
            ...data
        });
        return this.findOne(id);
    }
    remove(id) {
        return `This action removes a #${id} course`;
    }
    async updateCourseItemStatus(courseItemId, body) {
        const courseItem = await user_course_item_entity_1.UserCourseItem.findOne({
            where: {
                id: courseItemId
            }
        });
        const course = await course_entity_1.Course.findOne({
            where: {
                id: courseItem.courseId
            }
        });
        if (body.status == user_course_item_entity_1.ECourseItem.approved) {
            const chats = await chat_entity_1.Chat.createQueryBuilder('chat')
                .innerJoinAndSelect('chat.users', 'user')
                .where('chat.id = :chatId', { chatId: course.chatId })
                .andWhere('user.id = :id', {
                id: courseItem.userId,
            })
                .orderBy('chatMessage.created', 'ASC')
                .getCount();
            if (chats == 0) {
                await user_entity_1.User.query("INSERT INTO `user_chats` (`chat_id`, `user_id`) VALUES ('" +
                    course.chatId +
                    "', '" +
                    courseItem.userId +
                    "')");
            }
        }
        if (body.status == user_course_item_entity_1.ECourseItem.rejected) {
            await user_entity_1.User.query("DELETE FROM `user_chats` WHERE  `user_id` = '" + courseItem.userId + "' AND `chat_id` = '" + course.chatId + "' ");
        }
        return user_course_item_entity_1.UserCourseItem.update({
            id: courseItemId
        }, {
            status: body.status,
            certificated: body.certificated
        });
    }
    async getAllUserCourses() {
        return await user_course_item_entity_1.UserCourseItem.createQueryBuilder('user_course')
            .innerJoinAndSelect('user_course.user', 'user')
            .where('user.role = :role', { role: user_entity_1.Role.STUDENT })
            .getMany();
    }
    async getAllLessons() {
        return await course_entity_1.CourseLesson.find();
    }
    async createLesson(lesson) {
        return course_entity_1.CourseLesson.save({
            courseId: lesson.courseId,
            title: lesson.title,
            time: lesson.time,
            status: lesson.status,
            url: lesson.url
        });
    }
    async findLessonById(teacherId) {
        return course_entity_1.CourseLesson.findOne({
            where: { id: teacherId }
        });
    }
    async updateLesson(lesson) {
        let data = await this.findLessonById(lesson.id);
        await course_entity_1.CourseLesson.update(data.id, {
            courseId: lesson.courseId,
            title: lesson.title,
            time: lesson.time,
            status: lesson.status,
            url: lesson.url
        });
        return this.findLessonById(data.id);
    }
    async deleteLesson(lessonId) {
        try {
            await course_entity_1.CourseLesson.remove({
                id: lessonId
            });
            return {
                message: 'success'
            };
        }
        catch (error) {
            throw new common_1.HttpException('bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createTeacher(teacher) {
        return user_entity_1.User.save({
            name: teacher.name,
            lastname: teacher.lastname,
            email: teacher.email,
            password: await (0, bcrypt_1.hash)(teacher.password, 10),
            is_active: teacher.is_active,
            role: user_entity_1.Role.TEACHER
        });
    }
    async findTeachers() {
        return user_entity_1.User.find({
            where: {
                role: user_entity_1.Role.TEACHER
            }
        });
    }
    async findTeacherById(teacherId) {
        return user_entity_1.User.findOne({
            where: { id: teacherId, role: user_entity_1.Role.TEACHER }
        });
    }
    async updateTeacher(teacher) {
        let data = await this.findTeacherById(teacher.id);
        await user_entity_1.User.update(data.id, {
            name: teacher.name ?? data.name,
            is_active: teacher.is_active ?? data.is_active,
            email: teacher.email ?? data.email,
            picture_image: teacher.picture_image ?? data.picture_image
        });
        return this.findTeacherById(data.id);
    }
    async createQuiz(quiz) {
        return course_entity_1.Quiz.save({
            courseId: quiz.courseId,
            title: quiz.title,
            time: quiz.time,
            questions: quiz.questions,
            status: quiz.status
        });
    }
    findQuiz() {
        return course_entity_1.Quiz.find();
    }
    async findQuizById(quizId) {
        return course_entity_1.Quiz.findOne({
            where: { id: quizId }
        });
    }
    async updateQuiz(quiz) {
        let data = await this.findQuizById(quiz.id);
        await course_entity_1.Quiz.update(data.id, {
            courseId: quiz.courseId,
            title: quiz.title,
            time: quiz.time,
            questions: quiz.questions,
            status: quiz.status
        });
        return this.findQuizById(data.id);
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)()
], CourseService);
exports.CourseService = CourseService;
