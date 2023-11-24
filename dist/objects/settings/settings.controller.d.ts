import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<import("./entities/setting.entity").Setting>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<import("./entities/setting.entity").Setting>;
}
