import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { createQueryBuilder } from 'typeorm';
import { Chat } from '../chats/entities/chat.entity';
import { Role, User } from '../user/entities/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseAttendants } from './entities/course-attendents.entity';
import { CourseHomeWork } from './entities/course-homework.entity';
import { Course, CourseLesson, CreateQuizDto, Quiz } from './entities/course.entity';
import { ECourseItem, UserCourseItem } from './entities/user-course-item.entity';

@Injectable()
export class CourseService {
  getAllAttendees() {
    return CourseAttendants.find();
  }
  getAllHomeworks() {
    return CourseHomeWork.find();
  }


  async create(createCourseDto: CreateCourseDto) {


    const course = await Course.save({
      title: createCourseDto.title,
      duration: createCourseDto.duration,
      hour_duration: createCourseDto.hour_duration,
      faqs: createCourseDto.faqs,
      is_editor_choice: createCourseDto.is_editor_choice,
      is_featured: createCourseDto.is_featured,
      is_recommended_choice: createCourseDto.is_recommended_choice,
      live: createCourseDto.live,
      outlines: createCourseDto.outlines,
      perweek: createCourseDto.perweek,
      price: createCourseDto.price,
      rate: createCourseDto.rate,
      status: createCourseDto.status,
      sections: createCourseDto.sections,
      description: createCourseDto.description,
      students: []
    } as Course);

    const chat = await Chat.save({
      courseId: course.id,
      title: course.title + ' Groups',
      banner_image: course.feature_banner
    } as Chat);
    await Course.update({
      id: course.id
    }, {
      chatId: chat.id
    });

    const teachers = await User.findByIds(createCourseDto.teacherIds);
    const createdItem: UserCourseItem[] =
      []

    for await (const teacher of teachers) {
      let tc = await UserCourseItem.save({
        chatId: chat.id,
        courseId: course.id,
        userId: teacher.id
      } as UserCourseItem);
      createdItem.push(tc);
    }
    console.log(createdItem);
    course.students.push(...createdItem);

    await Course.save({
      ...course,

    } as Course)
    return Course.findOne(course.id);
    try {

    } catch (error) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return Course.find({
      relations: ["students"]
    }) //`This action returns all course`;
  }





  findOne(id: number) {
    return Course.findOne({
      where: {
        id,

      }, relations: ["students"]
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    let data = await this.findOne(id);

    const course = await Course.save({
      id,
      title: updateCourseDto.title ?? data.title,
      duration: updateCourseDto.duration ?? updateCourseDto.duration,
      hour_duration: updateCourseDto.hour_duration ?? updateCourseDto.hour_duration,
      faqs: updateCourseDto.faqs ?? updateCourseDto.faqs,
      is_editor_choice: updateCourseDto.is_editor_choice ?? updateCourseDto.is_editor_choice,
      is_featured: updateCourseDto.is_featured ?? updateCourseDto.is_featured,
      is_recommended_choice: updateCourseDto.is_recommended_choice ?? updateCourseDto.is_recommended_choice,
      live: updateCourseDto.live ?? updateCourseDto.live,
      outlines: updateCourseDto.outlines ?? updateCourseDto.outlines,
      perweek: updateCourseDto.perweek ?? updateCourseDto.perweek,
      price: updateCourseDto.price ?? updateCourseDto.price,
      rate: updateCourseDto.rate ?? updateCourseDto.rate,
      status: updateCourseDto.status ?? updateCourseDto.status,
      sections: updateCourseDto.sections ?? updateCourseDto.sections,
      description: updateCourseDto.description ?? updateCourseDto.description,
    } as Course);

    const courseWTeacher = await this.findOne(course.id);

    const deletedTeacher = courseWTeacher.teacherIds.filter(el => !updateCourseDto.teacherIds.includes(el));
    console.log(updateCourseDto.teacherIds);
    const mustCreatedTeacher = await User.findByIds(updateCourseDto.teacherIds);
    console.log('deleted', deletedTeacher);

    for await (const deletedT of deletedTeacher) {
      await UserCourseItem.delete({
        userId: deletedT,
        courseId: course.id
      })
    }
    const createdItem: UserCourseItem[] =
      []

    for await (const teacher of mustCreatedTeacher) {
      const foundedItem = await UserCourseItem.findOne({
        where: {
          courseId: course.id,
          userId: teacher.id
        }
      })
      let id = {}
      if(foundedItem) {
        id=  {id: foundedItem.id}
      }
      let tc = await UserCourseItem.save({
        ...id,
        chatId: course.chatId,
        courseId: course.id,
        userId: teacher.id,
        status: ECourseItem.none
      } as UserCourseItem);
      createdItem.push(tc);
    }
    console.log(createdItem);
    courseWTeacher.students.push(...createdItem);
    await Course.save({
      ...courseWTeacher
    } as Course)

    // const teachers = await User.findByIds(updateCourseDto.teacherIds)
    // const createdItem =
    //   []

    // for await (const teacher of teachers) {
    //   let tc = await UserCourseItem.save({
    //     chatId: course.chatId,
    //     courseId: course.id,
    //     userId: teacher.id
    //   } as UserCourseItem);
    //   createdItem.push(tc);
    // }
    // console.log(createdItem);

    // for await (const teacherId of updateCourseDto.teacherIds) {
    //   await UserCourseItem.query("DELETE FROM `user_course_item` WHERE  `user_id` = '" + teacherId + "' AND `course_id` = '" + id + "' "
    //   )
    // }

    // for await (const teacherId of updateCourseDto.teacherIds) {
    //   await UserCourseItem.query("DELETE FROM `user_course_item` WHERE  `user_id` = '" + teacherId + "' AND `course_id` = '" + id + "' "
    //   )
    // }


    return this.findOne(id);
  }

  async updateResim(id, data) {
    await Course.update(id, {
      ...data
    });


    return this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }


  async updateCourseItemStatus(courseItemId: number, body: any) {
    const courseItem = await UserCourseItem.findOne({
      where: {
        id: courseItemId
      }
    })
    const course = await Course.findOne({
      where: {
        id: courseItem.courseId
      }
    });

    if (body.status == ECourseItem.approved) {
      const chats = await Chat.createQueryBuilder('chat')
        .innerJoinAndSelect('chat.users', 'user')
        .where('chat.id = :chatId', { chatId: course.chatId })
        .andWhere('user.id = :id', {
          id: courseItem.userId,
        }
        )
        .orderBy('chatMessage.created', 'ASC')
        .getCount();
      if (chats == 0) {
        await User.query(
          "INSERT INTO `user_chats` (`chat_id`, `user_id`) VALUES ('" +
          course.chatId +
          "', '" +
          courseItem.userId +
          "')",
        );
      }
    }
    if (body.status == ECourseItem.rejected) {
      await User.query(
        "DELETE FROM `user_chats` WHERE  `user_id` = '" + courseItem.userId + "' AND `chat_id` = '" + course.chatId + "' "
      );
    }
    return UserCourseItem.update({
      id: courseItemId
    }, {
      status: body.status,
      certificated: body.certificated,
      certificateNo: body.certificateNo
    });
  }
  async getAllUserCourses() {
    return await UserCourseItem.createQueryBuilder('user_course')
      .innerJoinAndSelect('user_course.user', 'user')
      .where('user.role = :role', { role: Role.STUDENT })
      .getMany();
  }


  //#region Lesson Service

  async getAllLessons() {
    return await CourseLesson.find();
  }

  async createLesson(lesson: any) {
    return CourseLesson.save({
      courseId: lesson.courseId,
      title: lesson.title,
      time: lesson.time,
      status: lesson.status,
      url: lesson.url
    } as CourseLesson);
  }

  async findLessonById(teacherId: number) {
    return CourseLesson.findOne({
      where: { id: teacherId }
    })
  }

  async updateLesson(lesson: any) {
    let data = await this.findLessonById(lesson.id);
    await CourseLesson.update(data.id, {
      courseId: lesson.courseId,
      title: lesson.title,
      time: lesson.time,
      status: lesson.status,
      url: lesson.url
    });
    return this.findLessonById(data.id);
  }


  async deleteLesson(lessonId: number) {
    try {
      await CourseLesson.remove({
        id: lessonId
      } as CourseLesson);

      return {
        message: 'success'
      }
    } catch (error) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST)
    }
  }

  //#endregion


  //#region Quiz Service
  async createTeacher(teacher: any) {
    return User.save({
      name: teacher.name,
      lastname: teacher.lastname,
      email: teacher.email,
      password: await hash(teacher.password, 10),
      is_active: teacher.is_active,
      role: Role.TEACHER
    } as User);
  }

  async findTeachers() {
    return User.find({
      where: {
        role: Role.TEACHER
      }
    })
  }

  async findTeacherById(teacherId: number) {
    return User.findOne({
      where: { id: teacherId, role: Role.TEACHER }
    })
  }

  async updateTeacher(teacher: any) {
    let data = await this.findTeacherById(teacher.id);
    await User.update(data.id, {
      name: teacher.name ?? data.name,
      is_active: teacher.is_active ?? data.is_active,
      email: teacher.email ?? data.email,
      picture_image: teacher.picture_image ?? data.picture_image
    });
    return this.findTeacherById(data.id);
  }
  //#endregion

  //#region Quiz Service
  async createQuiz(quiz: CreateQuizDto) {
    return Quiz.save({
      courseId: quiz.courseId,
      title: quiz.title,
      time: quiz.time,
      questions: quiz.questions,
      status: quiz.status
    } as Quiz);
  }

  findQuiz() {
    return Quiz.find();
  }

  async findQuizById(quizId: number) {
    return Quiz.findOne({
      where: { id: quizId }
    })
  }

  async updateQuiz(quiz: Partial<CreateQuizDto>) {
    let data = await this.findQuizById(quiz.id);
    await Quiz.update(data.id, {
      courseId: quiz.courseId,
      title: quiz.title,
      time: quiz.time,
      questions: quiz.questions,
      status: quiz.status
    });
    return this.findQuizById(data.id);
  }
  //#endregion
}
