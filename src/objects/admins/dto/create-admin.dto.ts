export class CreateAdminDto {

    private readonly id;

    name: string;

    lastname: string;

    email: string;


    password?: string;

    is_active?:boolean;

}
