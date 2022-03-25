import { Test, TestingModule } from '@nestjs/testing';
import { CocktailDbService } from './cocktaildb.service';

describe('CocktailDbService', () => {
  let service: CocktailDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CocktailDbService],
    }).compile();

    service = module.get<CocktailDbService>(CocktailDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
