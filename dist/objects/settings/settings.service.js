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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const setting_entity_1 = require("./entities/setting.entity");
let SettingsService = class SettingsService {
    constructor() { }
    create(createSettingDto) {
        return 'This action adds a new setting';
    }
    findAll() {
        return this.findOne(1);
    }
    findOne(id) {
        return setting_entity_1.Setting.findOne(1);
    }
    async update(id, updateSettingDto) {
        await setting_entity_1.Setting.update(id, {
            ...updateSettingDto,
            id,
        });
        return this.findOne(id);
    }
    async setImage(imageType, fileName) {
        await setting_entity_1.Setting.update({ id: 1 }, {
            [imageType]: fileName
        });
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SettingsService);
exports.SettingsService = SettingsService;
