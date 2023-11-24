import { User } from '../user/entities/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseAttendants } from './entities/course-attendents.entity';
import { CourseHomeWork } from './entities/course-homework.entity';
import { Course, CourseLesson, CreateQuizDto, Quiz } from './entities/course.entity';
import { UserCourseItem } from './entities/user-course-item.entity';
export declare class CourseService {
    getAllAttendees(): Promise<CourseAttendants[]>;
    getAllHomeworks(): Promise<CourseHomeWork[]>;
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course>;
    updateResim(id: any, data: any): Promise<Course>;
    remove(id: number): string;
    updateCourseItemStatus(courseItemId: number, body: any): Promise<import("typeorm").UpdateResult>;
    getAllUserCourses(): Promise<UserCourseItem[]>;
    getAllLessons(): Promise<CourseLesson[]>;
    createLesson(lesson: any): Promise<CourseLesson>;
    findLessonById(teacherId: number): Promise<CourseLesson>;
    updateLesson(lesson: any): Promise<CourseLesson>;
    deleteLesson(lessonId: number): Promise<{
        message: string;
    }>;
    createTeacher(teacher: any): Promise<User>;
    findTeachers(): Promise<User[]>;
    findTeacherById(teacherId: number): Promise<User>;
    updateTeacher(teacher: any): Promise<User>;
    createQuiz(quiz: CreateQuizDto): Promise<Quiz>;
    findQuiz(): Promise<Quiz[]>;
    findQuizById(quizId: number): Promise<Quiz>;
    updateQuiz(quiz: Partial<CreateQuizDto>): Promise<Quiz>;
}
