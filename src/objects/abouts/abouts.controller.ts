import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editImageName } from 'src/file-upload.utils';
import { JwtAuthGuard } from 'src/jwt-auth/jwt.guard';
import { AboutsService } from './abouts.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@UseGuards(JwtAuthGuard)
@Controller('abouts')
export class AboutsController {
  constructor(private readonly aboutsService: AboutsService) {}

  @Post()
  create(@Body() createDataDto: CreateAboutDto) {
    return this.aboutsService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.aboutsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string | number) {
    return this.aboutsService.findOne(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataDto: UpdateAboutDto) {
    return this.aboutsService.update(+id, updateDataDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aboutsService.remove(+id);
  // }

  @Patch('image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: editImageName,
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    this.update(id, {
      one_cikan_resim: file.filename,
    });
  }
}
