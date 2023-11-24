"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseCategoryDto = exports.CreateCourseDto = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
class CreateCourseDto {
    id;
    created;
    updated;
    title;
    status;
    feature_banner;
    course_categories;
    faqs;
    description;
    icon;
    sections;
    teachers;
    duration;
    perweek;
    rate;
    offered;
    price;
    lessons;
    hour_duration;
    is_featured;
    is_editor_choice;
    is_recommended_choice;
    live;
    outlines;
    teacherIds;
    students;
}
exports.CreateCourseDto = CreateCourseDto;
class CreateCourseCategoryDto {
    id;
    created;
    updated;
    title;
    status;
    feature_banner;
    courses;
}
exports.CreateCourseCategoryDto = CreateCourseCategoryDto;
