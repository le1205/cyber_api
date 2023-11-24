import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_URL } from 'src/config';
import { editImageName } from 'src/file-upload.utils';
import { JwtAuthGuard } from 'src/jwt-auth/jwt.guard';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }

  // @Post()
  // create(@Body() createSettingDto: CreateSettingDto) {
  //   return this.settingsService.create(createSettingDto);
  // }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.settingsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(1, updateSettingDto);
  }

  // @Patch('image/:imageType')
  // @UseInterceptors(FileInterceptor('image', {
  //   storage: diskStorage({
  //     destination: './uploads/',
  //     filename: editImageName
  //   })
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File, @Param('imageType') imageType: string) {
  //   this.update("1", {
  //     id: 1,
  //     [imageType]: file.filename
  //   })

  // }

  
  // @Post('images')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads/images/',
  //     filename: editImageName
  //   })
  // }))
  // uploadImages(@UploadedFile() file: Express.Multer.File) {
    

  //   return {
  //     imageUrl: UPLOAD_URL + 'images/' + file.filename
  //   }

  // }







}
