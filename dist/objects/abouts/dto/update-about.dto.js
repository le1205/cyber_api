"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAboutDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_about_dto_1 = require("./create-about.dto");
class UpdateAboutDto extends (0, mapped_types_1.PartialType)(create_about_dto_1.CreateAboutDto) {
}
exports.UpdateAboutDto = UpdateAboutDto;
