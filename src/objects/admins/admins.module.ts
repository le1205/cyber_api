import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AuthService } from 'src/jwt-auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt-auth/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
      verifyOptions: {
        ignoreExpiration: true
      }
    }),],
  controllers: [AdminsController],
  providers: [AdminsService, AuthService],
  exports: [AdminsService]
})
export class AdminsModule { }
