import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  
  /**
   *
   */
  constructor( ) {}

  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  findAll() {
    return this.findOne(1);
  }

  findOne(id: number) {
    return Setting.findOne(1);
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    await Setting.update(
      id,
      {
        ...updateSettingDto,
        id,
      }
    )
    return this.findOne(id);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} setting`;
  // }

  async setImage(imageType,fileName) {
    await Setting.update(
      {id:1},
      {
        [imageType]:fileName
      }
    );
  }
}
