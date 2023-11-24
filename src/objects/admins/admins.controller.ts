import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/jwt-auth/auth.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt.guard';
import { UserDecorator } from 'src/shared/user.decorator';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';



@Controller('admin-users')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService, private authService: AuthService) { }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminsService.findOne(email);
  // }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }



  @Post('login')
  async validateUser(@Body() body: CreateAdminDto) {
    console.log(body);
    return this.authService.validateUser(body, this.adminsService);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('password_change')
  changePass(@Body() body: any, @UserDecorator() user: any) {
    return this.adminsService.updatePassword(body, user);
  }

  @Post('token/refresh')
  refreshToken(@Body() req) {

    return this.authService.refresh(req.token.refresh_token);

  }

}
