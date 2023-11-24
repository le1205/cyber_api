/// <reference types="multer" />
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';
export declare class ServicesController {
    protected readonly hizmetService: ServicesService;
    constructor(hizmetService: ServicesService);
    create(createDataDto: CreateServiceDto): Promise<any>;
    findAll(): Promise<import("./entities/service.entity").Service[]>;
    findOne(slug: string | number): Promise<import("./entities/service.entity").Service>;
    update(id: string, updateDataDto: UpdateServiceDto): Promise<import("./entities/service.entity").Service>;
    uploadFile(file: Express.Multer.File, id: string, req: any): Promise<import("./entities/service.entity").Service>;
}
