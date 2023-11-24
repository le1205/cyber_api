import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AdminRoutesModule } from './admin-routes/admin-routes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './jwt-auth/auth.module';
import { About } from './objects/abouts/entities/about.entity';
import { Service } from './objects/services/entities/service.entity';
import { Setting } from './objects/settings/entities/setting.entity';
import { routes } from './routes';
import { CourseModule } from './objects/course/course.module';
import { Course, CourseCategory, CourseLesson, Quiz, QuizData } from './objects/course/entities/course.entity';
import { UserModule } from './objects/user/user.module';
import { User } from './objects/user/entities/user.entity';
import { ChatsModule } from './objects/chats/chats.module';
import { Chat, ChatMessage } from './objects/chats/entities/chat.entity';
import { EventsModule } from './objects/events/events.module';
import { Event } from './objects/events/entities/event.entity';
import { SettingsModule } from './objects/settings/settings.module';
import { CourseAttendants } from './objects/course/entities/course-attendents.entity';
import { Admin } from './objects/admins/entities/admin.entity';
import { CourseHomeWork } from './objects/course/entities/course-homework.entity';
import { UserCourseItem } from './objects/course/entities/user-course-item.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Rabbikhan123RAB',
      database: 'cyber_app',
      entities: [  
        Setting,
        About,
        Service,
        Course,
        User,
        Chat,
        ChatMessage,
        Event,
        CourseAttendants,
        CourseCategory,
        CourseLesson,
        Admin,
        CourseHomeWork,
        Quiz,
        QuizData,
        UserCourseItem,
        ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'admin'),
      serveRoot: '/admin*',
    }),
    TypeOrmModule.forFeature([
      Setting,
      About,
      Service,
      Course,
      User,
      Chat,
      ChatMessage,
      Event,
      CourseAttendants,
      CourseCategory,
      CourseLesson,
      Admin,
      CourseHomeWork,
      Quiz,
      QuizData,
      UserCourseItem,
    ]),
    RouterModule.forRoutes(routes),
    AdminRoutesModule,
    AuthModule,
    CourseModule,
    UserModule,
    ChatsModule,
    EventsModule,
    SettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
