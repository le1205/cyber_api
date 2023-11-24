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
exports.AboutsService = void 0;
const common_1 = require("@nestjs/common");
const file_upload_utils_1 = require("../../file-upload.utils");
const about_entity_1 = require("./entities/about.entity");
let AboutsService = class AboutsService {
    constructor() { }
    async create(data) {
        let hakkimizda = await about_entity_1.About.insert({
            ...data,
            slug: (0, file_upload_utils_1.convertToSlug)(data.baslik)
        });
        return {
            id: hakkimizda.raw.insertId
        };
    }
    async findOne(term) {
        return await about_entity_1.About.findOne({
            where: [
                {
                    id: term,
                },
            ],
        });
    }
    findAll() {
        return about_entity_1.About.find({
            durum: true,
        });
    }
    async update(id, updateDataDto) {
        let data = await this.findOne(id);
        await about_entity_1.About.update(id, {
            ...updateDataDto,
            id,
            created: data.created,
            updated: data.updated,
            slug: (0, file_upload_utils_1.convertToSlug)(updateDataDto.baslik || data.baslik),
        });
        return this.findOne(id);
    }
};
AboutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AboutsService);
exports.AboutsService = AboutsService;
