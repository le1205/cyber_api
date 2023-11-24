export declare class CreateChatDto {
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
export declare class Participant {
    id: number;
    fullName: string;
    picture?: string;
    isTeacher: boolean;
}
export declare class CreateChatMessageDto {
    id: number;
    created: string;
    updated: string;
    message: string;
    isTeacher: boolean;
    sender: Sender;
    userId: number;
    chatId: number;
}
export declare class Sender {
    id: number;
    fullName: string;
    isTeacher: boolean;
    email: string;
    picture?: any;
}
