import { UpdateAboutDto } from './dto/update-about.dto';
import { About } from './entities/about.entity';
export declare class AboutsService {
    constructor();
    create(data: any): Promise<{
        id: any;
    }>;
    findOne(term: number | string): Promise<About>;
    findAll(): Promise<About[]>;
    update(id: number, updateDataDto: UpdateAboutDto): Promise<About>;
}
