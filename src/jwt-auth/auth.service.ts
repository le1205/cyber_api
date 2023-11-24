import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminsService } from 'src/objects/admins/admins.service';
import { jwtConstants } from './constant';
import { Course } from 'src/objects/course/entities/course.entity';
import { CourseService } from 'src/objects/course/course.service';
import { UserService } from 'src/objects/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    body: any,
    service: AdminsService | UserService,
  ): Promise<any> {
    const { email, password, remember_me } = body;
    const user = await service.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    if (user && isMatch) {
      const { password, ...result } = user;
      return this.login(result, remember_me);
    }
    throw new NotFoundException();
  }

  async login(user: any, hasRefresh = true) {
    const payload = { email: user.email, sub: user.id, role: user.role ?? 'admin' };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '144h',
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: jwtConstants.refresh_secret,
    });

    return {
      user: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
      token: {
        access_token: access_token,
        ...(hasRefresh
          ? {
              refresh_token: refresh_token,
            }
          : {}),
      },
    };
  }

  async refresh(refresh_token: any) {
    try {
      const user = this.jwtService.verify(refresh_token, {
        secret: jwtConstants.refresh_secret,
      });

      return this.login(user);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
