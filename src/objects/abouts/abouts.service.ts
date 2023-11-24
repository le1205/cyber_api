import { Injectable } from '@nestjs/common';
import { convertToSlug } from 'src/file-upload.utils';
import { UpdateAboutDto } from './dto/update-about.dto';
import { About } from './entities/about.entity';

@Injectable()
export class AboutsService {
  constructor() {}

  async create(data: any) {
   let hakkimizda = await About.insert({
     ...data,
     slug: convertToSlug(data.baslik)
   });
   return {
     id: hakkimizda.raw.insertId
   };
    // return await this.findOne(hakkimizda.identifiers[0]);
  }

  async findOne(term: number | string) {
    return await About.findOne({
      where: [
        {
          id: term,
        },
        // {
        //   slug: term,
        // },
      ],
    });
  }

  findAll() {
    return About.find({
      durum: true,
    });
  }

  async update(id: number, updateDataDto: UpdateAboutDto) {
    let data = await this.findOne(id);
    await About.update(id, {
      ...updateDataDto,
      id,
      created: data.created,
      updated: data.updated,
      slug: convertToSlug(updateDataDto.baslik || data.baslik),
    });
    return this.findOne(id);
  }
}
