"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sender = exports.CreateChatMessageDto = exports.Participant = exports.CreateChatDto = void 0;
class CreateChatDto {
    id;
    created;
    title;
    image;
    updated;
    is_deleted;
    readonly;
    chatMessages;
    participants;
    teacherId;
}
exports.CreateChatDto = CreateChatDto;
class Participant {
    id;
    fullName;
    picture;
    isTeacher;
}
exports.Participant = Participant;
class CreateChatMessageDto {
    id;
    created;
    updated;
    message;
    isTeacher;
    sender;
    userId;
    chatId;
}
exports.CreateChatMessageDto = CreateChatMessageDto;
class Sender {
    id;
    fullName;
    isTeacher;
    email;
    picture;
}
exports.Sender = Sender;
