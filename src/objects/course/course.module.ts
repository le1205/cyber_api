import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, CourseCategory } from './entities/course.entity';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([Course, CourseCategory,User])
  ]
})
export class CourseModule {}
