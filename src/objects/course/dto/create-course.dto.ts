import { User } from "src/objects/user/entities/user.entity";

export class CreateCourseDto {
  id?: number;
  created?: Date;
  updated?: Date;
  title: string;
  status: boolean;
  feature_banner: string;
  course_categories: CreateCourseCategoryDto[];
  faqs?: CourseFaqs[];
  description?: string;
  icon?: string;
  sections?: ICourseSection[];
  teachers?: User[];
  duration?: string;
  perweek?: string;

  rate?: number;
  offered?: string;
  price?: number;

  lessons?: CreateCourseLessonDto[];
  hour_duration
  is_featured
  is_editor_choice
  is_recommended_choice
  live
  outlines
  teacherIds?: any[]
  students: any[]
}

export class CreateCourseCategoryDto {
  id?: number;
  created?: Date;
  updated?: Date;
  title: string;
  status: boolean;
  feature_banner: string;
  courses: CreateCourseDto[];
}

export interface CourseFaqs {
  title: string;
  answer: string;
}

export interface SearchCourse {
  searchKey: string;
  level: SearchLevel;
  categories: number;
  rate: number;
}

interface SearchLevel {
  beginner: boolean;
  expert: boolean;
  intermediate: boolean;
  all: boolean;
}
export interface ICourseSection {
  title?: string;
  type?: 'check' | 'text';
  hasIcon?: boolean;
  contents?: string[];
}


export interface CreateCourseLessonDto {
  id?: number;
  title?: string;
  isShowed?: boolean;
  time?: string;
  url?: string;
  courseId?: number;
}