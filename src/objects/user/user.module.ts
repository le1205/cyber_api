import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { jwtConstants } from 'src/jwt-auth/constant';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/jwt-auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminsModule } from '../admins/admins.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [
    AdminsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  exports: [UserService]
})
export class UserModule {}
