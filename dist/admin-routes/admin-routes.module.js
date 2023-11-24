"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutesModule = void 0;
const common_1 = require("@nestjs/common");
const abouts_module_1 = require("../objects/abouts/abouts.module");
const admins_module_1 = require("../objects/admins/admins.module");
const events_module_1 = require("../objects/events/events.module");
const services_module_1 = require("../objects/services/services.module");
const settings_module_1 = require("../objects/settings/settings.module");
const user_module_1 = require("../objects/user/user.module");
let AdminRoutesModule = class AdminRoutesModule {
};
AdminRoutesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admins_module_1.AdminsModule,
            settings_module_1.SettingsModule,
            abouts_module_1.AboutsModule,
            services_module_1.ServicesModule,
            user_module_1.UserModule,
            events_module_1.EventsModule
        ],
    })
], AdminRoutesModule);
exports.AdminRoutesModule = AdminRoutesModule;
