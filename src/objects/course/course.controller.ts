import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editCourseName, editImageName } from 'src/file-upload.utils';
import { User } from '../user/entities/user.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateQuizDto } from './entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }




  @Get('user-courses')
  getAllUserCourses() {
    return this.courseService.getAllUserCourses();
  }

  @Patch('user-courses/:courseItemId')
  updateCourseItemStatus(@Param('courseItemId') courseItemId: number, @Body() body: any) {
    return this.courseService.updateCourseItemStatus(courseItemId, body);
  }




  @Patch('image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/courses/',
        filename: editCourseName,
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log(file.filename);
    return this.courseService.updateResim(id, {
      feature_banner_image: 'courses/' + file.filename,
    });
  }


  @Get('homeworks')
  getAllHomeworks() {
    return this.courseService.getAllHomeworks();
  }

  @Get('attendees')
  getAllAttendees() {
    return this.courseService.getAllAttendees();
  }


  @Get('lessons')
  getAllLessons() {
    return this.courseService.getAllLessons();
  }

  @Post("lessons/create")
  createLesson(@Body() lesson: any) {
    return this.courseService.createLesson(lesson);
  }

  @Patch("lessons/update")
  updateLesson(@Body() lesson: any) {
    return this.courseService.updateLesson(lesson);
  }

  @Delete("lessons/remove/:lessonId")
  deleteLesson(@Param('lessonId') lessonId: any) {
    return this.courseService.deleteLesson(lessonId);
  }


  //#region Teacher Endpoints


  @Get('teacher')
  findTeachers() {
    return this.courseService.findTeachers();
  }

  @ApiBody({
    schema: {
      example: {}
    }
  })
  @Post("teacher/create")
  createTeacher(@Body() teacher: any) {
    return this.courseService.createTeacher(teacher);
  }

  @Patch("teacher/update")
  updateTeacher(@Body() teacher: any) {
    return this.courseService.updateTeacher(teacher);
  }

  @Get('teacher/:teacherId')
  getTeacherById(@Param('teacherId') teacherId: any) {
    return this.courseService.findTeacherById(teacherId);
  }



  @Patch('image/teacher/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/teachers/',
        filename: editCourseName,
      }),
    }),
  )
  uploadTeacherImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log(file.filename);
    return this.updateTeacher({
      id,
      picture_image: 'teachers/' + file.filename,
    });
  }

  @Patch('images/:id')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/',
        filename: editImageName
      })
    })
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {


    return this.courseService.updateResim(id, {
      outlines: [...files.map(file => file.filename)],
    });
  }

  //#endregion


  /**
   * Quiz Endpoints
   */

  @Get("quiz")
  findQuiz() {
    return this.courseService.findQuiz();
  }

  @Post("quiz/create")
  createQuiz(@Body() quiz: CreateQuizDto) {
    return this.courseService.createQuiz(quiz);
  }

  @Patch("quiz/update")
  updateQuiz(@Body() quiz: CreateQuizDto) {
    return this.courseService.updateQuiz(quiz);
  }

  /**
   * End Quiz Endpoint
   */


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }



  @Patch(':id')
  update(@Param('id') id: any, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

}
