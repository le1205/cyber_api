"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSlug = exports.editHomeworkName = exports.editServiceName = exports.editCourseName = exports.editImageName = exports.editBannerImageName = exports.editFileName = void 0;
const path_1 = require("path");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const editBannerImageName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `banner-${randomName}${fileExtName}`);
};
exports.editBannerImageName = editBannerImageName;
const editImageName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const time = new Date().getTime();
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `image-${time}-${randomName}${fileExtName}`);
};
exports.editImageName = editImageName;
const editCourseName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const time = new Date().getTime();
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `course-${name}-${time}-${fileExtName}`);
};
exports.editCourseName = editCourseName;
const editServiceName = (req, file, callback) => {
    console.log(file);
    if (!file.mimetype.startsWith('image/')) {
        req.fileValidationError = "UNSUPPORTED_FILE_TYPE";
        return callback(null, "UNSUPPORTED_FILE_TYPE");
    }
    const name = file.originalname.split('.')[0];
    const time = new Date().getTime();
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `service-${name}-${time}-${fileExtName}`);
};
exports.editServiceName = editServiceName;
const editHomeworkName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const time = new Date().getTime();
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `homework-${name}-${time}-${fileExtName}`);
};
exports.editHomeworkName = editHomeworkName;
function convertToSlug(text, addTime = false) {
    var trMap = {
        çÇ: 'c',
        ğĞ: 'g',
        şŞ: 's',
        üÜ: 'u',
        ıİ: 'i',
        öÖ: 'o',
    };
    for (var key in trMap) {
        text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
    }
    text = text
        .replace(/[^-a-zA-Z0-9\s]+/gi, '')
        .replace(/\s/gi, '-')
        .replace(/[-]+/gi, '-')
        .toLowerCase();
    if (addTime) {
        text += "-" + new Date().getTime().toString().slice(-5);
    }
    return text;
}
exports.convertToSlug = convertToSlug;
