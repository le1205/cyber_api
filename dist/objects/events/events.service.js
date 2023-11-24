"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const event_entity_1 = require("./entities/event.entity");
let EventsService = class EventsService {
    async create(createEventDto) {
        return await event_entity_1.Event.save({
            title: createEventDto.title,
            description: createEventDto.title,
            status: createEventDto.status
        });
    }
    findAll() {
        return event_entity_1.Event.find();
    }
    async findOne(id) {
        return await event_entity_1.Event.findOne({
            id
        });
    }
    async update(id, updateEventDto) {
        delete updateEventDto.image_url;
        let data = await this.findOne(id);
        delete updateEventDto.id;
        await event_entity_1.Event.update(id, {
            ...updateEventDto,
            id,
            created: data.created,
            updated: data.updated,
        });
        console.log(id);
        return await event_entity_1.Event.findOne({ where: { id } });
    }
    remove(id) {
        return `This action removes a #${id} event`;
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)()
], EventsService);
exports.EventsService = EventsService;
