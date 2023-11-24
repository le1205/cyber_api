export class CreateChatDto {
  id: number;
  created: string;
  title: string;
  image: string;
  updated: string;
  is_deleted: boolean;
  readonly: boolean;
  chatMessages: CreateChatMessageDto[];
  participants: Participant[];


  teacherId: number;
}

export class Participant {
  id: number;
  fullName: string;
  picture?: string;
  isTeacher: boolean;
}

export class CreateChatMessageDto {
  id: number;
  created: string;
  updated: string;
  message: string;
  isTeacher: boolean;
  sender: Sender;
  userId: number;
  chatId: number;
}

export class Sender {
  id: number;
  fullName: string;
  isTeacher: boolean;
  email: string;
  picture?: any;
}
