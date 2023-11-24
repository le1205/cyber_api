/// <reference types="multer" />
import { AboutsService } from './abouts.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
export declare class AboutsController {
    private readonly aboutsService;
    constructor(aboutsService: AboutsService);
    create(createDataDto: CreateAboutDto): Promise<{
        id: any;
    }>;
    findAll(): Promise<import("./entities/about.entity").About[]>;
    findOne(slug: string | number): Promise<import("./entities/about.entity").About>;
    update(id: string, updateDataDto: UpdateAboutDto): Promise<import("./entities/about.entity").About>;
    uploadFile(file: Express.Multer.File, id: string): void;
}
