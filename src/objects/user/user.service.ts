import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor() {}
  create(createAdminDto: CreateUserDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return User.find({
      where: {
        role: Role.STUDENT
      }
    }) //`This action returns all admins`;
  }

  async findOne(email: string) {
    
    // if (!findedUser) {
    //   // const createdUser = await User.save({
    //   //   email: 'kasim@mail.com',
    //   //   name: 'Kasım',
    //   //   lastname: 'Yüksel',
    //   //   is_active: true,
    //   //   password: await bcrypt.hash('123456', 10),
    //   // } as User);

    //   console.log('', createdUser);
    // }
    return User.findOne({
      where: {
        email: email,
        is_active: true
      },
      select: ['id', 'email', 'password', 'name'],
    });
  }

  update(id: number, updateAdminDto: UpdateUserDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async updatePassword(body: {
    old_password: string;
    new_password: string;
    id: number;
    email: string;
  }) {
    const user = await User.findOne({
      where: {
        id: body.id,
        email: body.email,
        password: body.old_password,
      },
    });
    if (user) {
      return User.update(
        {
          id: body.id,
          email: body.email,
        },
        {
          password: body.new_password,
        },
      );
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async validate(adminDto) {
    const user = await User.findOne({
      where: {
        email: adminDto.email,
        password: adminDto.password,
      },
    });
    if (!user) return new NotFoundException();
    return user;
  }


  async createUser(user: any) {
    return User.save({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      is_active: user.is_active,
      role: Role.STUDENT
    } as User);
  }

  findUsers() {
    return User.find({
      where: {
        role: Role.STUDENT
      }
    });
  }

  async findUserById(userId: number) {
    return User.findOne({
      where: { id: userId, role: Role.STUDENT }
    })
  }

  async updateUser(user: any) {
    let data = await this.findUserById(user.id);
    await User.update(data.id, {
      name: user.name ?? data.name,
      is_active: user.is_active ?? data.is_active,
      lastname: user.lastname ?? data.lastname,
      email: user.email ?? data.email,
      picture_image: user.picture_image ?? data.picture_image
    });
    if(user.is_active == false) {
      await User.query(
        "DELETE FROM `user_chats` WHERE  `user_id` = '" + data.id + "'"
      );
    }
    return this.findUserById(data.id);
  }
}
