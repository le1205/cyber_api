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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./objects/admins/entities/admin.entity");
const service_entity_1 = require("./objects/services/entities/service.entity");
const setting_entity_1 = require("./objects/settings/entities/setting.entity");
const course_entity_1 = require("./objects/course/entities/course.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./objects/user/entities/user.entity");
const user_course_item_entity_1 = require("./objects/course/entities/user-course-item.entity");
const chat_entity_1 = require("./objects/chats/entities/chat.entity");
const date_fns_1 = require("date-fns");
const course_homework_entity_1 = require("./objects/course/entities/course-homework.entity");
const course_attendents_entity_1 = require("./objects/course/entities/course-attendents.entity");
const dump_data_1 = require("./dump.data");
const event_entity_1 = require("./objects/events/entities/event.entity");
let AppService = class AppService {
    courseRepository;
    async getAllUpcomingEvents() {
        return await event_entity_1.Event.find({
            where: {
                status: true
            }
        });
    }
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async GetAllCourses() {
        const courses = await course_entity_1.Course.find({
            where: {
                status: true
            }
        });
        return courses;
    }
    async getAllCategoies() {
        return await course_entity_1.CourseCategory.find({
            where: {
                status: true,
            },
        });
    }
    async getCourseByCategoryId(categoryId) {
        return;
    }
    async getCourseEnrolled(id, userId) {
        try {
            const result = await user_course_item_entity_1.UserCourseItem.findOne({
                courseId: id,
                userId: userId,
            });
            if (result)
                return true;
            else
                return false;
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllChats(userId) {
        return await chat_entity_1.Chat.createQueryBuilder('chat')
            .innerJoinAndSelect('chat.users', 'user')
            .where('user.id = :id', { id: userId })
            .getMany();
    }
    async createCourseQuiz(courseId, body) {
        const course = await this.getCourseById(courseId);
        console.log(course.id);
        return await course_entity_1.Quiz.save({
            courseId: course.id,
            questions: body.questions,
            time: body.time,
            title: body.title,
            status: body.status,
        });
    }
    async startQuiz(quizId, userId) {
        const quiz = await this.getQuizById(quizId);
        return await course_entity_1.QuizData.save({
            quizId: quiz.id,
            userId: userId,
            is_completed: false,
            is_started: true,
        });
    }
    async finishQuiz(quizId, userId, body) {
        const quiz = await this.getQuizById(quizId);
        await course_entity_1.QuizData.update({
            quizId: quiz.id,
            userId: userId,
        }, {
            is_completed: true,
            is_started: false,
            userAnswers: body.userAnswers,
        });
        return await course_entity_1.QuizData.findOne({
            where: {
                quizId: quiz.id,
                userId: userId,
            },
        });
    }
    async getMyQuizes(userId) {
        try {
            const quizData = await course_entity_1.QuizData.find({
                where: {
                    userId,
                },
            });
            return quizData;
        }
        catch (error) {
            throw new common_1.HttpException('not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async applyAttendant(userId, body) {
        try {
            await this.findUserById(userId);
            await this.getCourseById(body.courseId);
            const attendantCourse = await course_attendents_entity_1.CourseAttendants.findOne({
                courseId: body.courseId,
                userId: userId,
                attendant_date: body.attendant_date,
            });
            if (!attendantCourse) {
                return await course_attendents_entity_1.CourseAttendants.save({
                    courseId: body.courseId,
                    userId: userId,
                    attendant_date: body.attendant_date,
                });
            }
            return attendantCourse;
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCourseQuizes(courseId, userId) {
        try {
            await user_course_item_entity_1.UserCourseItem.findOneOrFail({
                where: {
                    courseId,
                    userId,
                },
            });
            const quizes = await course_entity_1.Quiz.find({
                where: {
                    courseId: courseId,
                    status: true,
                },
            });
            const myQuizes = await course_entity_1.QuizData.find({
                where: {
                    userId: userId,
                    is_completed: true,
                }
            });
            return quizes.map((quiz) => {
                const foundedQuiz = myQuizes.find(myQ => myQ.quizId == quiz.id);
                return {
                    ...quiz,
                    is_completed: foundedQuiz?.is_completed
                };
            });
        }
        catch (error) {
            throw new common_1.HttpException('not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllChatMessageByChatId(chatId, userId) {
        try {
            const chat = await chat_entity_1.Chat.createQueryBuilder('chat')
                .innerJoinAndSelect('chat.chatMessages', 'chatMessage')
                .leftJoinAndSelect('chatMessage.user', 'senderUser')
                .innerJoinAndSelect('chat.users', 'user')
                .where('chat.id = :chatId', { chatId: chatId })
                .andWhere('user.id = :id', {
                id: userId,
            })
                .orderBy('chatMessage.created', 'ASC')
                .getOne();
            return chat?.chatMessages ?? [];
        }
        catch (error) {
            throw new common_1.HttpException('not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getLastMessage(chatId, userId, created) {
        console.log((0, date_fns_1.format)(new Date(created), 'Ymd H:i:s'));
        const chatMessage = chat_entity_1.ChatMessage.find({
            where: [
                {
                    chatId,
                    created: (0, typeorm_1.MoreThan)((0, date_fns_1.addMilliseconds)(new Date(created), 1)),
                },
            ],
            order: {
                created: 'ASC',
            },
        });
        return chatMessage;
        return (await chat_entity_1.Chat.createQueryBuilder('chat')
            .innerJoinAndSelect('chat.chatMessages', 'chatMessage')
            .leftJoinAndSelect('chatMessage.user', 'senderUser')
            .leftJoinAndSelect('chatMessage.teacher', 'senderTeacher')
            .innerJoinAndSelect('chat.teachers', 'teacher')
            .innerJoinAndSelect('chat.users', 'user')
            .where('user.id = :id', { id: userId })
            .andWhere('chat.id = :chatId', { chatId })
            .orWhere('teacher.id = :teacherId', { teacherId: userId })
            .orWhere(' DATE(chatMessage.created) > :created', {
            created: (0, date_fns_1.format)(new Date(created), 'Ymd H:i:s'),
        })
            .orderBy('chatMessage.created', 'ASC')
            .getOne())?.chatMessages;
    }
    async sendMessage(body, userId) {
        try {
            console.log(body, userId);
            const userChats = await chat_entity_1.Chat.createQueryBuilder('chat')
                .innerJoinAndSelect('chat.users', 'user')
                .where('chat.id = :chatId', { chatId: body.chatId })
                .andWhere('user.id = :id', {
                id: userId,
            })
                .getOne();
            if (userChats) {
                const message = await chat_entity_1.ChatMessage.save({
                    message: body.message,
                    userId: userId,
                    chatId: body.chatId,
                });
                if (message) {
                    return {
                        message: 'success',
                    };
                }
            }
            else {
                throw new common_1.HttpException('User Not in Chat', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async sendHomework(filename, userId, courseId) {
        await this.findUserById(userId);
        await this.getCourseById(courseId);
        return await course_homework_entity_1.CourseHomeWork.save({
            courseId: courseId,
            userId: userId,
            file: filename,
        });
        try {
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createNewChat(body, userId) {
        const foundedUser = await user_entity_1.User.findOne({
            where: {
                id: userId,
            },
        });
        console.log(foundedUser);
        if (!foundedUser) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const foundedTeacher = await user_entity_1.User.findOne({
            where: {
                id: body.teacherId,
                role: user_entity_1.Role.TEACHER
            },
        });
        console.log(foundedTeacher);
        if (!foundedTeacher) {
            throw new common_1.HttpException('teacher not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const chat = await chat_entity_1.Chat.createQueryBuilder('chat')
            .innerJoinAndSelect('chat.chatMessages', 'chatMessage')
            .leftJoinAndSelect('chatMessage.user', 'senderUser')
            .innerJoinAndSelect('chat.users', 'user')
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('user.id = :id', {
                id: userId,
            }).andWhere(`user.id = :teacherId AND user.role = :role`, {
                teacherId: body.teacherId,
                role: user_entity_1.Role.TEACHER
            });
        }))
            .orderBy('chatMessage.created', 'DESC')
            .getOne();
        if (chat && chat.participants?.length == 2) {
            return chat;
        }
        const createdChat = await chat_entity_1.Chat.save({
            title: foundedTeacher?.fullName,
            banner_image: foundedTeacher?.picture_image,
        });
        createdChat.users = [foundedUser, foundedTeacher];
        await chat_entity_1.Chat.save(createdChat);
        return createdChat;
        try {
        }
        catch (error) {
            throw new common_1.HttpException('not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async GetAllTeachers() {
        return await user_entity_1.User.find({
            where: {
                is_active: true,
                role: user_entity_1.Role.TEACHER
            },
            relations: ['userCourseItems']
        });
    }
    async getPopulerCourses() {
        try {
            return await this.courseRepository.query(`select
    p1.*
    from courses p1
    INNER JOIN user_course_item p2 ON p1.id = p2.coursesId
    INNER JOIN user p3 on p2.userId = p3.id 
    Where p1.status = 1
    GROUP BY p1.id`);
        }
        catch (error) {
            return [];
        }
    }
    async getCourseById(id) {
        const course = await this.courseRepository.findOne({
            where: {
                id,
                status: true,
            },
        });
        if (!course)
            throw new common_1.HttpException('course not found', common_1.HttpStatus.NOT_FOUND);
        return course;
    }
    async getQuizById(id) {
        const quiz = await course_entity_1.Quiz.findOne({
            where: {
                id,
                status: true,
            },
        });
        if (!quiz)
            throw new common_1.HttpException('quiz not found', common_1.HttpStatus.NOT_FOUND);
        return quiz;
    }
    async searchCourse(searchParams) {
        let filter = {};
        let results = [];
        if (searchParams.searchKey?.trim().length > 0) {
            console.log(searchParams.searchKey);
            filter = {
                where: {
                    title: (0, typeorm_1.Like)(`%${searchParams.searchKey}%`),
                },
            };
        }
        results = await course_entity_1.Course.find(filter);
        return results;
    }
    async getServiceList() {
        return await service_entity_1.Service.find({
            where: {
                status: true,
            },
        });
    }
    async getMyCourses(user) {
        const courses = await user_course_item_entity_1.UserCourseItem.find({
            where: {
                userId: user.userId,
                status: user_course_item_entity_1.ECourseItem.approved
            },
            relations: ['course']
        });
        return courses;
    }
    async getUserInfo(userId) {
        try {
            const user = await user_entity_1.User.findOneOrFail({
                where: {
                    id: userId,
                    is_active: true,
                    is_deleted: false,
                },
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async enrollCourse(body, user) {
        const isTeacher = await user_entity_1.User.findOne({
            where: {
                id: user.userId,
                role: user_entity_1.Role.TEACHER
            }
        });
        if (isTeacher) {
            throw new common_1.HttpException('teacher cannot enroll course', common_1.HttpStatus.BAD_REQUEST);
        }
        const course = await course_entity_1.Course.findOne({
            where: {
                id: body.courseId,
                status: true,
            },
        });
        if (!course) {
            throw new common_1.HttpException('course not found', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            const foundedCourse = await user_course_item_entity_1.UserCourseItem.findOne({
                where: {
                    courseId: course.id,
                    userId: user.userId,
                },
            });
            if (foundedCourse) {
                throw new common_1.HttpException('course already enrolled', common_1.HttpStatus.CONFLICT);
            }
            const savedCourse = await user_course_item_entity_1.UserCourseItem.save({
                courseId: course.id,
                userId: user.userId,
                status: user_course_item_entity_1.ECourseItem.waiting,
            });
            return await user_course_item_entity_1.UserCourseItem.findOne({
                where: {
                    id: savedCourse.id,
                },
            });
        }
        try {
        }
        catch (error) {
            throw new common_1.HttpException(error ?? 'something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findUserById(userId) {
        const course = await user_entity_1.User.findOne({
            where: {
                id: userId,
                is_active: true,
            },
        });
        if (!course)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        return course;
    }
    async updatePassword(body, user) {
        if (!body.old_password || !body.new_password) {
            throw new common_1.HttpException('Fill required fields', common_1.HttpStatus.BAD_REQUEST);
        }
        const foundedUser = await user_entity_1.User.findOne({
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
                await user_entity_1.User.update({
                    id: user.userId,
                    email: user.email,
                }, {
                    password: await bcrypt.hash(body.new_password, 10),
                });
                return await user_entity_1.User.findOne({
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
    async resetPassword(userId) {
        try {
            const result = await user_entity_1.User.update({
                id: userId,
            }, {
                password: await bcrypt.hash('123456', 10),
            });
            if (result.affected == 1) {
                return {
                    message: 'success',
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProfilePicture(user, fileName) {
        try {
            const result = await user_entity_1.User.update(user.userId, {
                picture_image: fileName,
            });
            if (result.affected == 1) {
                return {
                    message: 'success',
                };
            }
        }
        catch (e) {
            console.log('', e);
        }
    }
    async dumpCourses() {
        await setting_entity_1.Setting.save({
            id: 1,
            address: '',
            phone: ['8801884636201'],
            whatsapp_phone: '8801884636201',
            email: ['Info@techdefendershub.com', 'Contact@techdefendershub.com']
        });
        const teacherCount = await user_entity_1.User.count({
            where: {
                role: 'teacher'
            }
        });
        if (teacherCount == 0) {
            await user_entity_1.User.save(dump_data_1.dumbTeachers);
        }
        const studentCount = await user_entity_1.User.count({
            where: {
                role: user_entity_1.Role.STUDENT
            }
        });
        if (studentCount == 0) {
            await user_entity_1.User.save(dump_data_1.dumbUsers);
        }
        const courseCount = await course_entity_1.Course.count();
        if (courseCount == 0) {
            const createdCourses = await course_entity_1.Course.save(dump_data_1.dumbCourses);
            for await (const course of createdCourses) {
                const chat = await chat_entity_1.Chat.save({
                    courseId: course.id,
                    title: course.title,
                    banner_image: course.feature_banner_image
                });
                await course_entity_1.Course.update({
                    id: course.id
                }, {
                    chatId: chat.id
                });
            }
        }
        const serviceCount = await service_entity_1.Service.count();
        if (serviceCount == 0) {
            await service_entity_1.Service.save(dump_data_1.dumbServices);
        }
        const admin = await admin_entity_1.Admin.count();
        if (admin == 0) {
            await admin_entity_1.Admin.save({
                name: 'Admin',
                lastname: 'TECH',
                is_active: true,
                is_deleted: false,
                email: 'tech@admin.com',
                password: await bcrypt.hash('admin123', 10)
            });
        }
        const events = await event_entity_1.Event.count();
        if (events == 0) {
            await event_entity_1.Event.save(dump_data_1.dumbEvents);
        }
        return {
            message: 'success'
        };
    }
    async onModuleInit() {
    }
    async getRapor() {
        let serviceCount = await service_entity_1.Service.count({
            where: {
                status: true,
            },
        });
        let courseCount = await course_entity_1.Course.count({
            where: {
                status: true,
            },
        });
        let teacherCount = await user_entity_1.User.count({
            where: {
                is_active: true,
                role: user_entity_1.Role.TEACHER
            },
        });
        let studentCount = await user_entity_1.User.count({
            where: {
                is_active: true,
                role: user_entity_1.Role.STUDENT
            },
        });
        return {
            serviceCount,
            teacherCount,
            courseCount,
            studentCount
        };
    }
    async settings() {
        console.log(await setting_entity_1.Setting.find());
        return await setting_entity_1.Setting.findOne(1);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AppService);
exports.AppService = AppService;
