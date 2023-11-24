import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/jwt-auth/auth.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt.guard';
import { ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editImageName } from 'src/file-upload.utils';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  async validateUser(@Body() body: CreateUserDto) {
    console.log(body);
    return this.authService.validateUser(body, this.userService);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password_change')
  changePass(@Body() body: any) {
    return this.userService.updatePassword(body);
  }

  @Post('token/refresh')
  refreshToken(@Body() req) {
    return this.authService.refresh(req.token.refresh_token);
  }

  @ApiBody({
    schema: {
      example: {}
    }
  })
  @Post()
  createUser(@Body() user: any) {
    return this.userService.createUser(user);
  }

  @Patch()
  updateUser(@Body() user: any) {
    return this.userService.updateUser(user);
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: any) {
    return this.userService.findUserById(userId);
  }

  @Patch('image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/students/',
        filename: editImageName,
      }),
    }),
  )
  uploadUserImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {

    return this.updateUser({
      id,
      picture_image: 'students/' + file.filename,
    });
  }
}
