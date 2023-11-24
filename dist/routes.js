"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const admins_module_1 = require("./objects/admins/admins.module");
const settings_module_1 = require("./objects/settings/settings.module");
const abouts_module_1 = require("./objects/abouts/abouts.module");
const services_module_1 = require("./objects/services/services.module");
const course_module_1 = require("./objects/course/course.module");
const user_module_1 = require("./objects/user/user.module");
const events_module_1 = require("./objects/events/events.module");
exports.routes = [
    {
        path: 'admin',
        children: [
            {
                path: '/',
                module: admins_module_1.AdminsModule
            },
            {
                path: '/',
                module: settings_module_1.SettingsModule
            },
            {
                path: '/',
                module: abouts_module_1.AboutsModule
            },
            {
                path: '/',
                module: services_module_1.ServicesModule
            },
            {
                path: '/',
                module: course_module_1.CourseModule
            },
            {
                path: '/',
                module: user_module_1.UserModule
            },
            {
                path: '/',
                module: events_module_1.EventsModule
            }
        ]
    },
    {
        path: '',
        childrens: [
            {
                path: '',
                module: user_module_1.UserModule
            }
        ]
    }
];
