export declare const dumbCourses: {
    id: number;
    title: string;
    status: boolean;
    feature_banner_image: string;
    faqs: {
        title: string;
        answer: string;
    }[];
    price: number;
    duration: string;
    hour_duration: string;
    perweek: string;
    rate: number;
    is_featured: boolean;
    is_editor_choice: boolean;
    is_recommended_choice: boolean;
    description: string;
    icon: any;
    sections: {
        title: string;
        type: string;
        hasIcon: boolean;
        contents: string[];
    }[];
    live: {
        url: string;
        is_started: boolean;
    };
    outlines: string[];
}[];
export declare const dumbTeachers: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    picture_image: string;
    rating: number;
    password: string;
    role: string;
}[];
export declare const dumbUsers: {
    name: string;
    email: string;
    is_active: boolean;
    picture_image: string;
    rating: number;
    password: string;
    role: string;
}[];
export declare const dumbServices: ({
    id: number;
    banner_image: string;
    title: string;
    status: boolean;
    description: string;
} | {
    banner_image: string;
    title: string;
    status: boolean;
    description: string;
    id?: undefined;
})[];
export declare const dumbEvents: {
    image: string;
    title: string;
    status: boolean;
    description: string;
}[];
