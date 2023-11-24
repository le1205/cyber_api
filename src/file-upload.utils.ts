import { extname } from 'path';

// export const imageFileFilter = (req, file, callback) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return callback(new Error('Only image files are allowed!'), false);
//   }
//   callback(null, true);
// };

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const editBannerImageName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `banner-${randomName}${fileExtName}`);
};

export const editImageName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const time = new Date().getTime();
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `image-${time}-${randomName}${fileExtName}`);
};


export const editCourseName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const time = new Date().getTime();
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `course-${name}-${time}-${fileExtName}`);
};


export const editServiceName = (req, file, callback) => {
  console.log(file)
  if (!file.mimetype.startsWith('image/')) {
    req.fileValidationError = "UNSUPPORTED_FILE_TYPE"
    return callback(null, "UNSUPPORTED_FILE_TYPE");
  }
 
  const name = file.originalname.split('.')[0];
  const time = new Date().getTime();
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `service-${name}-${time}-${fileExtName}`);
};




export const editHomeworkName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const time = new Date().getTime();
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `homework-${name}-${time}-${fileExtName}`);
};

// export function convertToSlug(text: string) {
//   return text.toLowerCase()
//     .replace(/[^\w ]+/g, '')
//     .replace(/ +/g, '-');
// }

export function convertToSlug(text, addTime = false) {
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
  .replace(/[^-a-zA-Z0-9\s]+/gi, '') // remove non-alphanumeric chars
  .replace(/\s/gi, '-') // convert spaces to dashes
  .replace(/[-]+/gi, '-') // trim repeated dashes
  .toLowerCase();

  if(addTime) {
    text +=  "-" + new Date().getTime().toString().slice(-5);
  }

  return text;
}
