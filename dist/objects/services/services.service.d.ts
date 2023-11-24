import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
export declare class ServicesService {
    constructor();
    create(data: any): Promise<any>;
    findOne(term: number | string): Promise<Service>;
    findAll(): Promise<Service[]>;
    findAllForSlider(): Promise<Service[]>;
    update(id: number, updateDataDto: UpdateServiceDto): Promise<Service>;
}
