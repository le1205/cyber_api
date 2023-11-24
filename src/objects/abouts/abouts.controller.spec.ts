import { Test, TestingModule } from '@nestjs/testing';
import { AboutsController } from './abouts.controller';
import { AboutsService } from './abouts.service';

describe('AboutsController', () => {
  let controller: AboutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutsController],
      providers: [AboutsService],
    }).compile();

    controller = module.get<AboutsController>(AboutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
