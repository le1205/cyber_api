import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AppService } from './app.service';
import { editHomeworkName, editImageName } from './file-upload.utils';
import { BlogSearchModel, KategoriSearchModel } from './shared/shared-model';
import { SearchCourse } from './objects/course/dto/create-course.dto';
import { UserDecorator } from './shared/user.decorator';
import { JwtAuthGuard } from './jwt-auth/jwt.guard';
import {
  CreateChatDto,
  CreateChatMessageDto,
} from './objects/chats/dto/create-chat.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateQuizDto } from './objects/course/entities/course.entity';
import { CreateUserDto } from './objects/user/dto/create-user.dto';
import { AuthService } from './jwt-auth/auth.service';
import { UserService } from './objects/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private userService: UserService) { }

  @Get('course-list')
  async getAllCourses() {
    return await this.appService.GetAllCourses();
  }

  @Get('category-list')
  async getAllCategories() {
    return await this.appService.getAllCategoies();
  }

  @Get('course-list/:categoryId')
  getCoursesByCategoryId(@Param('id') id: number) {
    return this.appService.getCourseByCategoryId(id);
  }

  @Get('course/is-enrolled/:id')
  @UseGuards(JwtAuthGuard)
  getIsEnrolled(@Param('id') id: number, @UserDecorator() user: { userId }) {
    return this.appService.getCourseEnrolled(id, user.userId);
  }

  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@UserDecorator() user: { userId }) {
    return this.appService.getUserInfo(user.userId);
  }

  @Get('teacher-list')
  async getAllTeachers() {
    return await this.appService.GetAllTeachers();
  }

  @Get('chat-list')
  @UseGuards(JwtAuthGuard)
  getChatList(@UserDecorator() user: any) {
    return this.appService.getAllChats(user.userId);
  }

  @Get('chat/:chatId/message-list')
  @UseGuards(JwtAuthGuard)
  getChatMessageList(
    @Param('chatId') chatId: number,
    @UserDecorator() user: any,
  ) {
    return this.appService.getAllChatMessageByChatId(chatId, user.userId);
  }

  @Post('quiz/create-quiz/:courseId')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      example: new CreateQuizDto(),
    },
  })
  createCourseQuiz(
    @Param('courseId') courseId: number,
    @Body() body: CreateQuizDto,
  ) {
    return this.appService.createCourseQuiz(courseId, body);
  }

  @Get('quiz/course-quizes/:courseId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getCourseQuizes(@Param('courseId') courseId: number, @UserDecorator() user: any) {
    return this.appService.getCourseQuizes(courseId, user.userId);
  }

  @Post('course/send-homework/:courseId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'uploads', 'homeworks'),
        filename: editHomeworkName,
      }),
    }),
  )
  uploadHomework(@UploadedFile() file: Express.Multer.File, @UserDecorator() user: any, @Param('courseId') courseId: number) {
    return this.appService.sendHomework('homeworks/' + file.filename, user.userId, courseId);
  }

  @Post('course/apply-attendant')
  @UseGuards(JwtAuthGuard)
  applyAttendants(@UserDecorator() user: any, @Body() body: any) {
    console.log(body)
    return this.appService.applyAttendant(user.userId, body);
  }


  @Get('upcoming-events')
  getAllUpcomingEvents() {
    return this.appService.getAllUpcomingEvents();
  }



  @Get('quiz/my-quizes')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getMyQuizes(@UserDecorator() user: any) {
    return this.appService.getMyQuizes(user.userId);
  }


  @Get('quiz/start-quiz/:quizId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  startQuiz(@Param('quizId') quizId: number, @UserDecorator() user: any) {
    return this.appService.startQuiz(quizId, user.userId);
  }

  @Post('quiz/finish-quiz/:quizId')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      example: {
        quizAnswers: [
          {
            question_number: 1,
            question_answer: 1,
          },
        ],
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  finishQuiz(
    @Param('quizId') quizId: number,
    @UserDecorator() user: any,
    @Body() body: any,
  ) {
    return this.appService.finishQuiz(quizId, user.userId, body);
  }

  @ApiBearerAuth()
  @ApiBody({
    schema: {
      example: {
        created: new Date(),
      },
    },
  })
  @Post('chat/:chatId/last-messages')
  @UseGuards(JwtAuthGuard)
  getLastMessages(
    @Param('chatId') chatId: number,
    @UserDecorator() user: any,
    @Body() body: any,
  ) {
    return this.appService.getLastMessage(chatId, user.userId, body.created);
  }

  @Get('populer-courses')
  getPopulerCourses() {
    return this.appService.getPopulerCourses();
  }

  @Post('chat/new-message')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      example: new CreateChatMessageDto(),
    },
  })
  @UseGuards(JwtAuthGuard)
  sendChatMessage(
    @Body() body: CreateChatMessageDto,
    @UserDecorator() user: any,
    @Req() req: any
  ) {
    console.log(req);
    return this.appService.sendMessage(body, user.userId);
  }

  @Post('chat/new-group')
  @UseGuards(JwtAuthGuard)
  createNewChat(@Body() body: CreateChatDto, @UserDecorator() user: any) {
    return this.appService.createNewChat(body, user.userId);
  }

  @Get('course-detail/:id')
  getCourseById(@Param('id') id: number) {
    return this.appService.getCourseById(id);
  }

  @Post('course-search')
  searchCourse(@Body() search: SearchCourse) {
    return this.appService.searchCourse(search);
  }

  @Get('service-list')
  getAllServices() {
    return this.appService.getServiceList();
  }

  @Get('my-course')
  @UseGuards(JwtAuthGuard)
  getMyCourses(@UserDecorator() user: { userId }) {
    return this.appService.getMyCourses(user);
  }

  @Post('enroll-course')
  @UseGuards(JwtAuthGuard)
  enrollCourse(@Body() body: any, @UserDecorator() user: any) {
    return this.appService.enrollCourse(body, user);
  }

  @Post('update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Body() body: any, @UserDecorator() user: any) {
    return this.appService.updatePassword(body, user);
  }

  @Get('reset-password')
  @UseGuards(JwtAuthGuard)
  resetPassword(@UserDecorator() user: { userId }) {
    return this.appService.resetPassword(user.userId);
  }

  @Get('dump-course')
  dump() {
    return this.appService.dumpCourses();
  }

  @Post('user/login')
  async validateUser(@Body() body: CreateUserDto) {
    console.log(body);
    return this.authService.validateUser(body, this.userService);
  }

  // @Get()
  // index() {
  //   return;
  // }

  // @Get('get-all-images')
  // getImages() {
  //   return fs
  //     .readdirSync(join(__dirname, '..', 'uploads'))
  //     .filter(
  //       (el) =>
  //         el.endsWith('png') ||
  //         el.endsWith('jpeg') ||
  //         el.endsWith('jpg') ||
  //         el.endsWith('svg'),
  //     );
  // }

  // @Post('iletisim')
  // postIletisimForm(@Body() iletisimForm) {
  //   return this.appService.postIletisimForm(iletisimForm);
  // }

  // // @Get('blogs/by-kategori')
  // // getBlogsWithoutKategoriId() {
  // //   throw new NotFoundException();
  // // }

  // // @Get('blogs/by-kategori/:kategoriSlug')
  // // getBlogByKategoriId(@Param('kategoriSlug') kategoriSlug: string) {
  // //   return this.appService.getBlogByKategoriId(kategoriSlug);
  // // }

  // // @Get('blogs/page/:pageNumber')
  // // getBlogByPage(@Param('pageNumber') pageNumber: number) {
  // //   return this.appService.getBlogByPageNumber(pageNumber);
  // // }

  // @Post('blogs')
  // async getBlogByPageOne(@Res() Response: Response, @Body() data: BlogSearchModel) {
  //   console.log(data);
  //   return Response.status(HttpStatus.OK).send(
  //     await this.appService.getBlogsByFilter(data),
  //   );
  // }

  // @Get('blog/:blogSlug')
  // getBlogBySlug(@Param('blogSlug') blogSlug: string) {
  //   return this.appService.getBlogBySlug(blogSlug);
  // }

  // @Post('kategoriler')
  // getKategoriler(@Body() data: KategoriSearchModel) {
  //   return this.appService.getKategoriler(data);
  // }

  // @Get('tum-etiketler')
  // getTumEtiketler() {
  //   return this.appService.getTumEtiketler();
  // }

  @Get('settings')
  getSettings() {
    return this.appService.settings();
  }

  // @Get('en-son-bloglar')
  // getRecentBlogs() {
  //   return this.appService.getRecentBlogs();
  // }

  // @Get('tum-ozellikler')
  // getTumOzellikler() {
  //   return this.appService.getTumOzellikler();
  // }

  // @Get('services')
  // getServices() {
  //   return this.appService.getServices();
  // }

  // @Get('services/:slug')
  // getServicesDetail(@Param() data: any) {
  //   return this.appService.getServiceDetail(data.slug);
  // }

  // @Get('abouts/:slug')
  // getAboutDetail(@Param() data: any) {
  //   return this.appService.getAboutDetail(data.slug);
  // }

  // @Get('hizmet-fiyatlandirma/:hizmetId')
  // getFiyatlandirmaByHizmetId(@Param() data: any) {
  //   return this.appService.getFiyatlandirmaByHizmetId(data.hizmetId);
  // }

  // @Get('services-list')
  // getServicesJustTitle() {
  //   return this.appService.findAllServiceForSlider();
  // }

  // @Get('hakkimizda-list')
  // getAboutsJustTitle() {
  //   return this.appService.findAllAboutForSlider();
  // }

  // @Get('services-select-box')
  // getServicesForSelectBox() {
  //   return this.appService.getServicesForSelectBox();
  // }

  // @Get('about-us')
  // getAboutUs() {
  //   return this.appService.getAbouts;
  // }

  // // @Get('image/:imageType')
  // // getImage(@Param() data: any) {
  // //   return this.appService.getImage(data.imageType);
  // // }

  @Get('rapor')
  getRapors() {
    return this.appService.getRapor();
  }

  // @Get('get-popular-tags')
  // getPopularTags() {
  //   return this.appService.getPopularTags();
  // }

  @Post('image-upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),
        filename: editImageName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.filename,
    };
  }

  @Post('profile-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),
        filename: editImageName,
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  updateProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @UserDecorator() user: any,
  ) {
    console.log(user, file.filename);
    return this.appService.updateProfilePicture(user, file.filename);
  }
}

interface LastMessage {
  created: Date;
}
