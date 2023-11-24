import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { response } from 'express';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(Admin)
    private repository: Repository<Admin>,
  ) {

  }
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(email: string) {
    return this.repository.findOne({
      where: {
        email:email
      },
      select: ['id', 'email', 'password', 'name']
    });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async updatePassword(body: any, user: { userId: number; email: string }) {
    console.log(user);
    if (!body.old_password || !body.new_password) {
      throw new HttpException('Fill required fields', HttpStatus.BAD_REQUEST);
    }
    const foundedUser = await Admin.findOne({
      where: {
        id: user.userId,
        email: user.email,
      },
      select: ['id', 'password', 'name', 'email'],
    });
    if (foundedUser) {
      console.log(foundedUser, body);
      const isPasswordMatched = await bcrypt.compare(
        body.old_password,
        foundedUser.password,
      );
      console.log(isPasswordMatched);
      if (isPasswordMatched) {
        await Admin.update(
          {
            id: user.userId,
            email: user.email,
          },
          {
            password: await bcrypt.hash(body.new_password, 10),
          },
        );

        return await Admin.findOne({
          where: {
            id: user.userId,
          },
        });
      } else {
        throw new HttpException('password_wrong', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  async validate(adminDto) {

    const user = await this.repository.findOne({
      where: {
        email: adminDto.email,
        password: adminDto.password
      }
    });
    if (!user) return new NotFoundException();
    return user;

  }
}
