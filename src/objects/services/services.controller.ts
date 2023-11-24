import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editImageName, editServiceName } from 'src/file-upload.utils';
import { JwtAuthGuard } from 'src/jwt-auth/jwt.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE
}


@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServicesController {
  constructor(protected readonly hizmetService: ServicesService) { }

  @Post()
  create(@Body() createDataDto: CreateServiceDto) {
    return this.hizmetService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.hizmetService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string | number) {
    return this.hizmetService.findOne(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataDto: UpdateServiceDto) {
    return this.hizmetService.update(+id, updateDataDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hizmetService.remove(+id);
  // }

  @Patch('image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/services/',
        filename: editServiceName,
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Req() req: any
  ) {
    if (file.filename == "UNSUPPORTED_FILE_TYPE") {
      // if so, throw the BadRequestException
      throw new BadRequestException('Only images are allowed', `Bad request. Accepted file extensions are: image/*`);
    }
    console.log(file.filename);
    return this.update(id, {
      banner_image: 'services/' + file.filename,
    });
  }
}

