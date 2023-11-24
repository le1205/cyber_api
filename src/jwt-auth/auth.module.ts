import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { AdminsModule } from 'src/objects/admins/admins.module';
import { UserService } from 'src/objects/user/user.service';

@Module({
    imports: [
        AdminsModule,
        UserService,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '144h' },
            verifyOptions: {
                ignoreExpiration: true
            }
        }),],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule { }
