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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const nest_router_1 = require("nest-router");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const admin_routes_module_1 = require("./admin-routes/admin-routes.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./jwt-auth/auth.module");
const about_entity_1 = require("./objects/abouts/entities/about.entity");
const service_entity_1 = require("./objects/services/entities/service.entity");
const setting_entity_1 = require("./objects/settings/entities/setting.entity");
const routes_1 = require("./routes");
const course_module_1 = require("./objects/course/course.module");
const course_entity_1 = require("./objects/course/entities/course.entity");
const user_module_1 = require("./objects/user/user.module");
const user_entity_1 = require("./objects/user/entities/user.entity");
const chats_module_1 = require("./objects/chats/chats.module");
const chat_entity_1 = require("./objects/chats/entities/chat.entity");
const events_module_1 = require("./objects/events/events.module");
const event_entity_1 = require("./objects/events/entities/event.entity");
const settings_module_1 = require("./objects/settings/settings.module");
const course_attendents_entity_1 = require("./objects/course/entities/course-attendents.entity");
const admin_entity_1 = require("./objects/admins/entities/admin.entity");
const course_homework_entity_1 = require("./objects/course/entities/course-homework.entity");
const user_course_item_entity_1 = require("./objects/course/entities/user-course-item.entity");
let AppModule = class AppModule {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mariadb',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Rabbikhan123RAB',
                database: 'cyber_app',
                entities: [
                    setting_entity_1.Setting,
                    about_entity_1.About,
                    service_entity_1.Service,
                    course_entity_1.Course,
                    user_entity_1.User,
                    chat_entity_1.Chat,
                    chat_entity_1.ChatMessage,
                    event_entity_1.Event,
                    course_attendents_entity_1.CourseAttendants,
                    course_entity_1.CourseCategory,
                    course_entity_1.CourseLesson,
                    admin_entity_1.Admin,
                    course_homework_entity_1.CourseHomeWork,
                    course_entity_1.Quiz,
                    course_entity_1.QuizData,
                    user_course_item_entity_1.UserCourseItem,
                ],
                synchronize: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'admin'),
                serveRoot: '/admin*',
            }),
            typeorm_1.TypeOrmModule.forFeature([
                setting_entity_1.Setting,
                about_entity_1.About,
                service_entity_1.Service,
                course_entity_1.Course,
                user_entity_1.User,
                chat_entity_1.Chat,
                chat_entity_1.ChatMessage,
                event_entity_1.Event,
                course_attendents_entity_1.CourseAttendants,
                course_entity_1.CourseCategory,
                course_entity_1.CourseLesson,
                admin_entity_1.Admin,
                course_homework_entity_1.CourseHomeWork,
                course_entity_1.Quiz,
                course_entity_1.QuizData,
                user_course_item_entity_1.UserCourseItem,
            ]),
            nest_router_1.RouterModule.forRoutes(routes_1.routes),
            admin_routes_module_1.AdminRoutesModule,
            auth_module_1.AuthModule,
            course_module_1.CourseModule,
            user_module_1.UserModule,
            chats_module_1.ChatsModule,
            events_module_1.EventsModule,
            settings_module_1.SettingsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
