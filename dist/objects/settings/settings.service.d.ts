import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
export declare class SettingsService {
    constructor();
    create(createSettingDto: CreateSettingDto): string;
    findAll(): Promise<Setting>;
    findOne(id: number): Promise<Setting>;
    update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting>;
    setImage(imageType: any, fileName: any): Promise<void>;
}
