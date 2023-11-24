import { Module } from '@nestjs/common';
import { AboutsModule } from 'src/objects/abouts/abouts.module';
import { AdminsModule } from 'src/objects/admins/admins.module';
import { EventsModule } from 'src/objects/events/events.module';
import { ServicesModule } from 'src/objects/services/services.module';
import { SettingsModule } from 'src/objects/settings/settings.module';
import { UserModule } from 'src/objects/user/user.module';


@Module({
  imports: [
    AdminsModule,
    SettingsModule,
    AboutsModule,
    ServicesModule,
    UserModule,
    EventsModule
  ],
})
export class AdminRoutesModule {}
