import { Module } from '@nestjs/common';
import { AboutsService } from './abouts.service';
import { AboutsController } from './abouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from './entities/about.entity';

@Module({
  controllers: [AboutsController],
  providers: [AboutsService],
  imports: [
    TypeOrmModule.forFeature([About])
  ]
})
export class AboutsModule {}
