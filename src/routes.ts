import { AdminsModule } from './objects/admins/admins.module';
import { Routes } from 'nest-router';
import { SettingsModule } from './objects/settings/settings.module';
import { AboutsModule } from './objects/abouts/abouts.module';
import { ServicesModule } from './objects/services/services.module';
import { CourseModule } from './objects/course/course.module';
import { UserModule } from './objects/user/user.module';
import { EventsModule } from './objects/events/events.module';


export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '/',
        module: AdminsModule
      },
      {
        path: '/',
        module: SettingsModule
      },
      {
        path: '/',
        module: AboutsModule
      },
      {
        path: '/',
        module: ServicesModule
      },
      {
        path: '/',
        module: CourseModule
      },
      {
        path: '/',
        module: UserModule
      },
      {
        path: '/',
        module: EventsModule
      }
    ]
  },
  {
    path: '',
    childrens: [
      {
        path: '',
        module: UserModule
      }
    ]
  }
];
