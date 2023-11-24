import { Injectable } from '@nestjs/common';
import { convertToSlug } from 'src/file-upload.utils';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor() { }

  async create(data: any) {
    delete data.image;
    let hizmet = await Service.save({
      ...data,
    });
    return hizmet
  }

  async findOne(term: number | string) {
    let hizmet = await Service.findOne({
      where: [
        {
          id: term,
        },
        // {
        //   slug: term,
        // },
      ],
    });
    return hizmet;
  }

  findAll() {
    return Service.find();
  }

  findAllForSlider() {
    return Service.find({
      where: {
        status: true,
      },
    });
  }

  async update(id: number, updateDataDto: UpdateServiceDto) {
    delete updateDataDto.image;
    let data = await this.findOne(id);
    delete updateDataDto.id; 
    await Service.update(id, {
      ...updateDataDto,
      id,
      created: data.created,
      updated: data.updated,
    });
    console.log(id);
    return await Service.findOne({where: {id}})
  }
}
