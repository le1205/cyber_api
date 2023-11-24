/// <reference types="multer" />
import { User } from '../user/entities/user.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateQuizDto } from './entities/course.entity';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    getAllUserCourses(): Promise<import("./entities/user-course-item.entity").UserCourseItem[]>;
    updateCourseItemStatus(courseItemId: number, body: any): Promise<import("typeorm").UpdateResult>;
    uploadFile(file: Express.Multer.File, id: string): Promise<import("./entities/course.entity").Course>;
    getAllHomeworks(): Promise<import("./entities/course-homework.entity").CourseHomeWork[]>;
    getAllAttendees(): Promise<import("./entities/course-attendents.entity").CourseAttendants[]>;
    getAllLessons(): Promise<import("./entities/course.entity").CourseLesson[]>;
    createLesson(lesson: any): Promise<import("./entities/course.entity").CourseLesson>;
    updateLesson(lesson: any): Promise<import("./entities/course.entity").CourseLesson>;
    deleteLesson(lessonId: any): Promise<{
        message: string;
    }>;
    findTeachers(): Promise<User[]>;
    createTeacher(teacher: any): Promise<User>;
    updateTeacher(teacher: any): Promise<User>;
    getTeacherById(teacherId: any): Promise<User>;
    uploadTeacherImage(file: Express.Multer.File, id: string): Promise<User>;
    uploadFiles(files: Array<Express.Multer.File>, id: string): Promise<import("./entities/course.entity").Course>;
    findQuiz(): Promise<import("./entities/course.entity").Quiz[]>;
    createQuiz(quiz: CreateQuizDto): Promise<import("./entities/course.entity").Quiz>;
    updateQuiz(quiz: CreateQuizDto): Promise<import("./entities/course.entity").Quiz>;
    remove(id: string): string;
    update(id: any, updateCourseDto: UpdateCourseDto): Promise<import("./entities/course.entity").Course>;
    findOne(id: string): Promise<import("./entities/course.entity").Course>;
    findAll(): Promise<import("./entities/course.entity").Course[]>;
}
