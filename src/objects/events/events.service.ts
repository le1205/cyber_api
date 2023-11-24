import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  async create(createEventDto: CreateEventDto) {
    return await Event.save({
      title: createEventDto.title,
      description: createEventDto.title,
      status: createEventDto.status
    } as Event);
  }

  findAll() {
    return Event.find();
  }

  async findOne(id: number) {
    return await Event.findOne({
      id
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    delete updateEventDto.image_url;
    let data = await this.findOne(id);
    delete updateEventDto.id;
    await Event.update(id, {
      ...updateEventDto,
      id,
      created: data.created,
      updated: data.updated,
    });
    console.log(id);
    return await Event.findOne({ where: { id } })
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }


}
