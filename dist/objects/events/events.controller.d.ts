/// <reference types="multer" />
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<import("./entities/event.entity").Event>;
    findAll(): Promise<import("./entities/event.entity").Event[]>;
    findOne(id: string): Promise<import("./entities/event.entity").Event>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<import("./entities/event.entity").Event>;
    remove(id: string): string;
    uploadUserImage(file: Express.Multer.File, id: string): Promise<import("./entities/event.entity").Event>;
}
