import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  Brackets,
  FindManyOptions,
  In,
  Like,
  MoreThan,
  Repository,
  SelectQueryBuilder,
  createQueryBuilder,
} from 'typeorm';
import { About } from './objects/abouts/entities/about.entity';
import { Admin } from './objects/admins/entities/admin.entity';
import { Service } from './objects/services/entities/service.entity';
import { Setting } from './objects/settings/entities/setting.entity';
import { BlogSearchModel, KategoriSearchModel } from './shared/shared-model';
import {
  Course,
  CourseCategory,
  CourseLesson,
  CreateQuizDto,
  Quiz,
  QuizData,
} from './objects/course/entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCourse } from './objects/course/dto/create-course.dto';
import { ArrayContains } from 'class-validator';
import { Role, User } from './objects/user/entities/user.entity';
import {
  ECourseItem,
  UserCourseItem,
} from './objects/course/entities/user-course-item.entity';
import { Chat, ChatMessage } from './objects/chats/entities/chat.entity';
import {
  CreateChatDto,
  CreateChatMessageDto,
} from './objects/chats/dto/create-chat.dto';
import { UPLOAD_URL } from './config';
import { addMilliseconds, format } from 'date-fns';
import { CourseHomeWork } from './objects/course/entities/course-homework.entity';
import { CourseAttendants } from './objects/course/entities/course-attendents.entity';
import { dumbCourses, dumbEvents, dumbServices, dumbTeachers, dumbUsers } from './dump.data';
import { Event } from './objects/events/entities/event.entity';

@Injectable()
export class AppService implements OnModuleInit {
  async getAllUpcomingEvents() {
    return await Event.find({
      where: {
        status: true
      }
    })
  }
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  async GetAllCourses() {
    const courses = await Course.find({
      // relations: ['students'],
      where: {
        status: true
      }
    });

    return courses;
  }

  async getAllCategoies() {
    return await CourseCategory.find({
      where: {
        status: true,
      },
    });
  }

  async getCourseByCategoryId(categoryId: number) {
    return //
    // (
    //   await CourseCategory.findOne({
    //     where: {
    //       status: true,
    //       id: categoryId,
    //     },
    //     relations: ['courses'],
    //   })
    // )?.courses?.filter((el) => el.status);
  }

  async getCourseEnrolled(id: number, userId: number) {
    try {
      const result = await UserCourseItem.findOne({
        courseId: id,
        userId: userId,
      });

      if (result) return true;
      else return false;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllChats(userId) {
    return await Chat.createQueryBuilder('chat')
      .innerJoinAndSelect('chat.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  async createCourseQuiz(courseId: number, body: CreateQuizDto) {
    const course = await this.getCourseById(courseId);
    console.log(course.id);
    return await Quiz.save({
      courseId: course.id,
      questions: body.questions,
      time: body.time,
      title: body.title,
      status: body.status,
    } as Quiz);
  }

  async startQuiz(quizId, userId) {
    const quiz = await this.getQuizById(quizId);

    return await QuizData.save({
      quizId: quiz.id,
      userId: userId,
      is_completed: false,
      is_started: true,
    } as QuizData);
  }

  async finishQuiz(quizId, userId, body) {
    const quiz = await this.getQuizById(quizId);

    await QuizData.update(
      {
        quizId: quiz.id,
        userId: userId,
      },
      {
        is_completed: true,
        is_started: false,
        userAnswers: body.userAnswers,
      },
    );

    return await QuizData.findOne({
      where: {
        quizId: quiz.id,
        userId: userId,
      },
    });
  }

  async getMyQuizes(userId) {
    try {
      const quizData = await QuizData.find({
        where: {
          userId,
        },
      });

      return quizData;
    } catch (error) {
      throw new HttpException('not found', HttpStatus.BAD_REQUEST);
    }
  }

  async applyAttendant(userId, body) {
    try {
      await this.findUserById(userId);
      await this.getCourseById(body.courseId);

      const attendantCourse = await CourseAttendants.findOne({
        courseId: body.courseId,
        userId: userId,
        attendant_date: body.attendant_date,
      });

      if (!attendantCourse) {
        return await CourseAttendants.save({
          courseId: body.courseId,
          userId: userId,
          attendant_date: body.attendant_date,
        } as CourseAttendants);
      }

      return attendantCourse;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async getCourseQuizes(courseId, userId) {

    try {
      await UserCourseItem.findOneOrFail({
        where: {
          courseId,
          userId,
        },
      });

      const quizes = await Quiz.find({
        where: {
          courseId: courseId,
          status: true,
        },
      });
      const myQuizes = await QuizData.find({
        where: {
          userId: userId,
          is_completed: true,
        }
      });

      return quizes.map((quiz) => {
        const foundedQuiz = myQuizes.find(myQ => myQ.quizId == quiz.id);

        return {
          ...quiz,
          is_completed: foundedQuiz?.is_completed
        }
      })
    } catch (error) {
      throw new HttpException('not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllChatMessageByChatId(chatId, userId) {
    try {
      const chat = await Chat.createQueryBuilder('chat')

        .innerJoinAndSelect('chat.chatMessages', 'chatMessage')
        .leftJoinAndSelect('chatMessage.user', 'senderUser')
        .innerJoinAndSelect('chat.users', 'user')
        .where('chat.id = :chatId', { chatId: chatId })
        .andWhere('user.id = :id', {
          id: userId,
        }
        )
        .orderBy('chatMessage.created', 'ASC')
        .getOne();

      return chat?.chatMessages ?? [];
    } catch (error) {
      throw new HttpException('not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getLastMessage(chatId, userId, created: Date) {
    console.log(format(new Date(created), 'Ymd H:i:s'));
    const chatMessage = ChatMessage.find({
      where: [
        {
          chatId,
          created: MoreThan(addMilliseconds(new Date(created), 1)),
        },
      ],
      order: {
        created: 'ASC',
      },
    });

    return chatMessage;

    return (
      await Chat.createQueryBuilder('chat')

        .innerJoinAndSelect('chat.chatMessages', 'chatMessage')
        .leftJoinAndSelect('chatMessage.user', 'senderUser')
        .leftJoinAndSelect('chatMessage.teacher', 'senderTeacher')
        .innerJoinAndSelect('chat.teachers', 'teacher')
        .innerJoinAndSelect('chat.users', 'user')
        .where('user.id = :id', { id: userId })
        .andWhere('chat.id = :chatId', { chatId })
        .orWhere('teacher.id = :teacherId', { teacherId: userId })
        .orWhere(' DATE(chatMessage.created) > :created', {
          created: format(new Date(created), 'Ymd H:i:s'),
        })
        .orderBy('chatMessage.created', 'ASC')
        .getOne()
    )?.chatMessages;
  }

  async sendMessage(body: Partial<CreateChatMessageDto>, userId: any) {

    try {
      console.log(body, userId);
      const userChats = await Chat.createQueryBuilder('chat')
        .innerJoinAndSelect('chat.users', 'user')
        .where('chat.id = :chatId', { chatId: body.chatId })
        .andWhere('user.id = :id', {
          id: userId,
        })
        .getOne();
      if (userChats) {
        const message = await ChatMessage.save({
          message: body.message,
          userId: userId,
          chatId: body.chatId,
        } as ChatMessage);

        if (message) {
          return {
            message: 'success',
          };
        }
      } else {
        throw new HttpException('User Not in Chat', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async sendHomework(filename, userId, courseId) {
    await this.findUserById(userId);
    await this.getCourseById(courseId);

    return await CourseHomeWork.save({
      courseId: courseId,
      userId: userId,
      file: filename,
    } as CourseHomeWork);
    try {

    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
    // return await CourseHomeWork.save()
  }

  async createNewChat(body: Partial<CreateChatDto>, userId: any) {
    const foundedUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    console.log(foundedUser);

    if (!foundedUser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const foundedTeacher = await User.findOne({
      where: {
        id: body.teacherId,
        role: Role.TEACHER
      },
    });

    console.log(foundedTeacher);
    if (!foundedTeacher) {
      throw new HttpException('teacher not found', HttpStatus.BAD_REQUEST);
    }
    const chat = await Chat.createQueryBuilder('chat')

      .innerJoinAndSelect('chat.chatMessages', 'chatMessage')
      .leftJoinAndSelect('chatMessage.user', 'senderUser')
      .innerJoinAndSelect('chat.users', 'user')
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.id = :id', {
            id: userId,
          }).andWhere(`user.id = :teacherId AND user.role = :role`, {
            teacherId: body.teacherId,
            role: Role.TEACHER
          });
        }),
      )
      .orderBy('chatMessage.created', 'DESC')
      .getOne();

    if (chat && chat.participants?.length == 2) {
      return chat;
    }

    const createdChat = await Chat.save({
      title: foundedTeacher?.fullName,
      banner_image: foundedTeacher?.picture_image,
    } as Chat);

    createdChat.users = [foundedUser, foundedTeacher];
    await Chat.save(createdChat);

    return createdChat;
    try {
    } catch (error) {
      throw new HttpException('not found', HttpStatus.BAD_REQUEST);
    }
  }

  async GetAllTeachers() {

    return await User.find({
      where: {
        is_active: true,
        role: Role.TEACHER
      },
      relations: ['userCourseItems']
    });
  }

  async getPopulerCourses() {
    try {
      return await this.courseRepository.query(`select
    p1.*
    from courses p1
    INNER JOIN user_course_item p2 ON p1.id = p2.coursesId
    INNER JOIN user p3 on p2.userId = p3.id 
    Where p1.status = 1
    GROUP BY p1.id`);
    } catch (error) {
      return [];
    }
  }

  async getCourseById(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!course)
      throw new HttpException('course not found', HttpStatus.NOT_FOUND);

    return course;
  }

  async getQuizById(id: number) {
    const quiz = await Quiz.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!quiz) throw new HttpException('quiz not found', HttpStatus.NOT_FOUND);

    return quiz;
  }

  async searchCourse(searchParams: SearchCourse) {
    let filter = {} as FindManyOptions<Course>;
    let results = [];

    if (searchParams.searchKey?.trim().length > 0) {
      console.log(searchParams.searchKey);
      filter = {
        where: {
          title: Like(`%${searchParams.searchKey}%`),
        },
      };
    }

    // if (searchParams.categories) {
    //   let courseByCategory = await CourseCategory.findOne({
    //     where: {
    //       id: searchParams.categories,
    //     },
    //     relations: ['courses'],
    //   });

    //   if (courseByCategory) {
    //     console.log(searchParams.searchKey);
    //     results = courseByCategory.courses
    //       .filter((course) => course.status)
    //       .filter((el) =>
    //         el.title
    //           .toLocaleLowerCase()
    //           .includes(searchParams.searchKey?.toLocaleLowerCase() ?? ''),
    //       );
    //   }
    // } else {
    //   results = await Course.find(filter);
    // }
    results = await Course.find(filter);
    return results;
  }

  async getServiceList() {
    // await Service.save([
    //   {
    //     "title": "UI/UX & Graphics Design",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Craft user-friendly interfaces using cutting-edge UX/UI best practices. With a dedicated design process, punctual delivery, and expert craftsmanship, TechDefenders Hub's UI/UX services bring your vision to life.” please make sure to add photo-like arena web security.",
    //   },
    //   {
    //     "title": "SEO (Search Engine Optimization)",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Experience the power of strategic SEO campaigns tailored to Google's algorithm. Elevate your website's ranking by optimizing various ranking factors, and showcasing your content's value to search engines.",
    //   },
    //   {
    //     "title": "Ecommerce Solutions",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Leverage our experienced mobile app developers to create cutting-edge applications that meet global standards. With in-depth market analysis, forecasts, and stunning design, we craft top-tier mobile apps that resonate with users worldwide.",
    //   },
    //   {
    //     "title": "Mobile App Development",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Craft user-friendly interfaces using cutting-edge UX/UI best practices. With a dedicated design process, punctual delivery, and expert craftsmanship, TechDefenders Hub's UI/UX services bring your vision to life.” please make sure to add photo-like arena web security.",
    //   },
    //   {
    //     "title": "Network Security Services (NSS)",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Our Network Security Services (NSS) offer cross-platform support for security-enabled applications. With SSL, TLS, PKCS, S/MIME, and X.509 v3 certificates, NSS provides a foundation for robust security across client-server applications.",
    //   },
    //   {
    //     "title": "Software Development",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Experience a comprehensive suite of software development services tailored to your requirements. From software consulting to cloud migration, our team excels in crafting solutions for mid and large enterprises, as well as software product companies across diverse industries.",
    //   },
    //   {
    //     "title": "Software Maintenance",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "TechDefenders Hub is your go-to destination for comprehensive software maintenance. Our trusted professionals are dedicated to enhancing and sustaining your existing applications. Benefit from our experts' deep expertise in application maintenance services, ensuring the longevity of your software investments."
    //   },
    //   {
    //     "title": "Vulnerability Assessment & Penetration Testing (VAPT)",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Our VAPT services encompass a spectrum of security assessment solutions tailored to unearth vulnerabilities across your IT infrastructure. Understanding your organization's unique needs, we aid in addressing cybersecurity exposures, and enhancing your digital defense strategy."
    //   },
    //   {
    //     "title": "Software Testing",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Discover a comprehensive array of testing services encompassing Web Application & Website Testing, Manual and Automated Testing, Mobile Testing, Security and Penetration Testing, and more. From QA to DevOps, we offer end-to-end Independent QA and Managed Testing services across diverse platforms."
    //   },
    //   {
    //     "title": "Cybersecurity Consultancy",
    //     "status": true,
    //     "banner_image": "https://techdefendershub.com/wp-content/uploads/2023/08/Muktar-Ahmad-Icon_UI-UX-Graphics-Design-768x822.png",
    //     "description": "Cyberattacks are an unavoidable reality in the digital landscape. Our Cybersecurity and Risk Services provide proactive solutions to stay ahead of these threats, fostering confidence among your customers. Our holistic approach prioritizes risk reduction, prevention, and loss control, ensuring your digital environment remains secure."
    //   }
    // ] as any[])
    return await Service.find({
      where: {
        status: true,
      },
    });
  }

  async getMyCourses(user: any) {
    const courses = await UserCourseItem.find({
      where: {
        userId: user.userId,
        status: ECourseItem.approved
      },
      relations: ['course']
    });
    return courses;
  }

  async getUserInfo(userId) {
    try {
      const user = await User.findOneOrFail({
        where: {
          id: userId,
          is_active: true,
          is_deleted: false,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async enrollCourse(body: any, user: { userId, role: Role }) {

    const isTeacher = await User.findOne({
      where: {
        id: user.userId,
        role: Role.TEACHER
      }
    });

    if (isTeacher) {
      throw new HttpException('teacher cannot enroll course', HttpStatus.BAD_REQUEST);
    }

    const course = await Course.findOne({
      where: {
        id: body.courseId,
        status: true,
      },
    });

    if (!course) {
      throw new HttpException('course not found', HttpStatus.NOT_FOUND);
    } else {
      const foundedCourse = await UserCourseItem.findOne({
        where: {
          courseId: course.id,
          userId: user.userId,
        },

      });

      if (foundedCourse) {
        throw new HttpException(
          'course already enrolled',
          HttpStatus.CONFLICT,
        );
      }
      const savedCourse = await UserCourseItem.save({
        courseId: course.id,
        userId: user.userId,
        status: ECourseItem.waiting,
      } as UserCourseItem);

      // const courseChat = await Chat.findOne({
      //   where: {
      //     courseId: course.id,
      //   },
      // });
      // let chat = courseChat;
      // if (!courseChat) {
      //   chat = await Chat.save({
      //     title: course.title + ' Groups',
      //     users: [...course.students.map((st) => st.user)],
      //     banner_image: course.feature_banner_image,
      //     courseId: course.id
      //   } as Chat);
      // }

      // const users = [
      //   ...course.students.map((st) => st.user),
      //   await this.findUserById(user.userId),
      // ];


      // await Course.update({
      //   id: course.id
      // }, {
      //   chatId: chat.id
      // })
      // await Chat.update({
      //   id: chat.id
      // }, {
      //   users: [await this.findUserById(user.userId)]
      // })
      // .update(
      //   {
      //     id: chat.id,
      //     courseId: course.id
      //   },
      //   {
      //     users
      //   },
      // );

      return await UserCourseItem.findOne({
        where: {
          id: savedCourse.id,
        },
      });
    }

    try {

    } catch (error) {
      throw new HttpException(
        error ?? 'something went wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUserById(userId: number) {
    const course = await User.findOne({
      where: {
        id: userId,
        is_active: true,
      },
    });

    if (!course)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return course;
  }

  async updatePassword(body: any, user: { userId: number; email: string }) {
    if (!body.old_password || !body.new_password) {
      throw new HttpException('Fill required fields', HttpStatus.BAD_REQUEST);
    }
    const foundedUser = await User.findOne({
      where: {
        id: user.userId,
        email: user.email,
      },
      select: ['id', 'password', 'name', 'email'],
    });
    if (foundedUser) {
      console.log(foundedUser, body);
      const isPasswordMatched = await bcrypt.compare(
        body.old_password,
        foundedUser.password,
      );
      console.log(isPasswordMatched);
      if (isPasswordMatched) {
        await User.update(
          {
            id: user.userId,
            email: user.email,
          },
          {
            password: await bcrypt.hash(body.new_password, 10),
          },
        );

        return await User.findOne({
          where: {
            id: user.userId,
          },
        });
      } else {
        throw new HttpException('password_wrong', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async resetPassword(userId) {
    try {
      const result = await User.update(
        {
          id: userId,
        },
        {
          password: await bcrypt.hash('123456', 10),
        },
      );

      if (result.affected == 1) {
        return {
          message: 'success',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfilePicture(user: { userId: number }, fileName: string) {
    try {
      const result = await User.update(user.userId, {
        picture_image: fileName,
      });
      if (result.affected == 1) {
        return {
          message: 'success',
        };
      }
    } catch (e) {
      console.log('', e);
    }
  }

  async dumpCourses() {

    await Setting.save({
      id: 1,
      address: '',
      phone: ['8801884636201'],
      whatsapp_phone: '8801884636201',
      email: ['Info@techdefendershub.com', 'Contact@techdefendershub.com']
    } as Setting);

    const teacherCount = await User.count({
      where: {
        role: 'teacher'
      }
    });

    if (teacherCount == 0) {
      await User.save(dumbTeachers as User[]);
    }

    const studentCount = await User.count({
      where: {
        role: Role.STUDENT
      }
    })

    if (studentCount == 0) {
      await User.save(dumbUsers as User[]);
    }


    const courseCount = await Course.count();


    if (courseCount == 0) {
      const createdCourses = await Course.save(dumbCourses as Course[]);
      for await (const course of createdCourses) {
        const chat = await Chat.save({
          courseId: course.id,
          title: course.title,
          banner_image: course.feature_banner_image
        } as Chat);
        await Course.update({
          id: course.id
        }, {
          chatId: chat.id
        })
      }
    }

    const serviceCount = await Service.count();

    if (serviceCount == 0) {
      await Service.save(dumbServices as Service[]);
    }

    const admin = await Admin.count();
    if (admin == 0) {
      await Admin.save({
        name: 'Admin',
        lastname: 'TECH',
        is_active: true,
        is_deleted: false,
        email: 'tech@admin.com',
        password: await bcrypt.hash('admin123', 10)
      } as Admin)
    }

    const events = await Event.count();

    if (events == 0) {
      await Event.save(dumbEvents as Event[])
    }



    return {
      message: 'success'
    }




  }

  async onModuleInit() {
    // await Chat.save({
    //   title: 'Chat 1',
    //   image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    // } as Chat);
    // let findAdmin = await Admin.findOne({
    //   where: {
    //     email: 'onurtangur@gmail.com',
    //   },
    // });
    // if (!findAdmin) {
    //   let admin = await Admin.save({
    //     email: 'admin@gmail.com',
    //     name: 'Admin',
    //     lastname: 'Admin',
    //     is_active: true,
    //     password: await bcrypt.hash('Onur.1907+', 10),
    //   } as Admin);
    // }
    // let ayar = await Setting.findOne({
    //   where: {
    //     id: 1,
    //   },
    // });
    // if (!ayar) {
    //   await Setting.save({
    //     id: 1,
    //     address: '',
    //   } as Setting);
    // }
  }

  // async getKategoriler(data: KategoriSearchModel) {
  //   try {
  //     let ana_kategori = {};
  //     let select = {};
  //     if (data.ana_kategori) {
  //       ana_kategori = {
  //         ana_kategori_id: data.ana_kategori,
  //       };
  //     }

  //     if (data.type == 'list') {
  //       select = {
  //         select: ['id', 'durum', 'ana_kategori_id', 'slug', 'baslik'],
  //       };
  //     }

  //     let kategoriler = await BlogKategori.find({
  //       where: {
  //         durum: true,
  //         ...ana_kategori,
  //       },
  //       ...select,
  //       take: data.take || undefined
  //     });

  //     return kategoriler;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // async getBlogByKategoriId(kategoriSlug: string) {
  // //   try {
  // //     const kategori = await BlogKategori.findOneOrFail({
  // //       where: {
  // //         slug: kategoriSlug,
  // //         durum: true,
  // //       },
  // //     });
  // //     if (!kategori) {
  // //       throw new NotFoundException();
  // //     }

  // //     return await Blog.find({
  // //       where: {
  // //         durum: true,
  // //         kategoriId: kategori.id,
  // //       },
  // //       take: 10,
  // //       order: {
  // //         created: 'DESC',
  // //       },
  // //     });
  // //   } catch (error) {
  // //     throw new BadRequestException();
  // //   }
  // // }

  // async getBlogBySlug(slug: string) {
  //   return await Blog.findOneOrFail({
  //     where: {
  //       slug,
  //     },
  //     relations: ['kategori', 'createdBy']
  //   });
  // }

  // async getBlogsByFilter(data: BlogSearchModel) {
  //   let pageNumber = data.page || 1;
  //   let take = data.take || 10;
  //   let kategoriId = {};
  //   let etiket = {};
  //   let searchTerm = {};
  //   try {
  //     if (data.searchTerm) {
  //       searchTerm = {
  //         baslik: Like(`%${data.searchTerm}%`),
  //       };
  //     }
  //     if (data.etiket) {
  //       etiket = {
  //         etiketler: Like(`%${data.etiket}%`),
  //       };
  //     }
  //     if (data.kategori_slug) {
  //       let kategori = await BlogKategori.findOne({
  //         where: {
  //           slug: data.kategori_slug,
  //           durum: true,
  //         },
  //       });
  //       // if (!kategori) {
  //       //   throw new NotFoundException('category not found');
  //       // }

  //       kategoriId = { kategoriId: kategori?.id };
  //     }
  //     // let blogs: SelectQueryBuilder<Blog> | Blog[];
  //     // if (data.etiket) {
  //     //   blogs = Blog.createQueryBuilder('blogs')
  //     //     .where('blogs.etiketler like :etiketId', { etiketId: `%${data.etiket}%` })
  //     //     .take(take)
  //     //     .skip((pageNumber - 1) * take);
  //     //   if (data.kategori_slug) {
  //     //     blogs.andWhere('kategoriId = :kategoriId', kategoriId);
  //     //   }
  //     //   console.log(blogs.getQuery())
  //     //   blogs = await blogs.getMany();
  //     // } else {
  //     let blogs = await Blog.find({
  //       where: {
  //         durum: true,
  //         ...kategoriId,
  //         ...etiket,
  //         ...searchTerm,
  //       },
  //       skip: (pageNumber - 1) * take,
  //       take: take,
  //       order: {
  //         created: 'DESC',
  //       },
  //       select: [
  //         'id',
  //         'baslik',
  //         'created',
  //         'slug',
  //         'kategoriId',
  //         'one_cikan_resim',
  //         'kisa_aciklama',
  //       ],
  //     });
  //     // }

  //     // if (blogs.length == 0) throw new NotFoundException('blog not found');

  //     return blogs;
  //   } catch (error) {
  //     throw new NotFoundException(error?.message);
  //   }
  // }

  // async getAboutDetail(id: number | string) {
  //   try {
  //     return await About.findOneOrFail({
  //       where: [
  //         {
  //           id: id,
  //           durum: true,
  //         },
  //         {
  //           slug: id,
  //           durum: true,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }

  // async getPopularTags() {
  //   let blogs = await Blog.find({
  //     where: {
  //       durum: true,
  //     },
  //   });
  //   let tags: string[] = blogs.reduce(
  //     (pr, acc) => pr.concat(acc.etiketler),
  //     [],
  //   );
  //   let counts = tags.reduce((pr, acc) => {
  //     if (pr[acc]) pr[acc] += 1;
  //     else pr[acc] = 1;

  //     return pr;
  //   }, {});
  //   const sortable = Object.entries(counts)
  //     .sort(([, a]: any, [, b]: any) => b - a)
  //     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  //   return Object.keys(sortable).slice(0, 5);
  //   // return {
  //   //   tags: Object.keys(sortable).slice(0, 2),
  //   //   counts,
  //   // };
  // }

  async getRapor() {
    let serviceCount = await Service.count({
      where: {
        status: true,
      },
    });
    let courseCount = await Course.count({
      where: {
        status: true,
      },
    });
    let teacherCount = await User.count({
      where: {
        is_active: true,
        role: Role.TEACHER
      },
    });

    let studentCount = await User.count({
      where: {
        is_active: true,
        role: Role.STUDENT
      },
    });

    return {
      serviceCount,
      teacherCount,
      courseCount,
      studentCount

    };
  }

  // async findAllServiceForSlider() {
  //   return await Service.find({
  //     where: {
  //       durum: true,
  //     },
  //     select: ['id', 'baslik', 'slug', 'durum', 'one_cikan_resim'],
  //   });
  // }

  // async findAllAboutForSlider() {
  //   return await About.find({
  //     where: {
  //       durum: true,
  //     },
  //     select: ['id', 'baslik', 'slug', 'durum', 'one_cikan_resim'],
  //   });
  // }

  // async getServicesForSelectBox() {
  //   return await Service.find({
  //     where: {
  //       durum: true,
  //     },
  //     select: ['id', 'baslik', 'durum'],
  //   });
  // }
  // async getServices() {
  //   return await Service.find({
  //     where: {
  //       durum: true,
  //     },
  //   });
  // }

  // get getAbouts() {
  //   return About.find({ durum: true });
  // }

  // async postIletisimForm(iletisimForm) {
  //   return await Contact.insert(iletisimForm);
  // }

  async settings() {
    console.log(await Setting.find())
    return await Setting.findOne(1);
  }

  // async getTumOzellikler() {
  //   let fiyatlandirmalar = await Fiyatlandirma.find({ durum: true });
  //   return fiyatlandirmalar.reduce(
  //     (pr, acc) => pr.concat(acc.ozellikler.filter((el) => !pr.includes(el))),
  //     [],
  //   );
  // }

  // async getRecentBlogs() {
  //   return await Blog.find({
  //     order: {
  //       created: 'DESC',
  //     },
  //     take: 3,
  //     where: {
  //       durum: true,
  //     },
  //     relations: ['createdBy'],
  //   });
  // }

  // // async getImage(imageType) {
  // //   let setting = await this.settings;
  // //   return {
  // //     image: setting[`${imageType}`],
  // //   };
  // // }

  // async getSozlesme(slug: string) {
  //   let setting = await this.settings;
  //   return {
  //     sozlesme: setting[`${slug}`],
  //   };
  // }
}
