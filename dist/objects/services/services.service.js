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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const file_upload_utils_1 = require("../../file-upload.utils");
const service_entity_1 = require("./entities/service.entity");
let ServicesService = class ServicesService {
    constructor() { }
    async create(data) {
        delete data.image;
        let hizmet = await service_entity_1.Service.save({
            ...data,
        });
        return hizmet;
    }
    async findOne(term) {
        let hizmet = await service_entity_1.Service.findOne({
            where: [
                {
                    id: term,
                },
            ],
        });
        return hizmet;
    }
    findAll() {
        return service_entity_1.Service.find();
    }
    findAllForSlider() {
        return service_entity_1.Service.find({
            where: {
                status: true,
            },
        });
    }
    async update(id, updateDataDto) {
        delete updateDataDto.image;
        let data = await this.findOne(id);
        delete updateDataDto.id;
        await service_entity_1.Service.update(id, {
            ...updateDataDto,
            id,
            created: data.created,
            updated: data.updated,
        });
        console.log(id);
        return await service_entity_1.Service.findOne({ where: { id } });
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ServicesService);
exports.ServicesService = ServicesService;
