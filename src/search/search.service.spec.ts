import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { SearchResults } from './search.api';
import { ProfileService } from '../profile/profile.service';
import { CocktailDbService } from './cocktaildb/service/cocktaildb.service';
import { CocktailDbMapper } from './cocktaildb/mapper/cocktaildb.mapper';
import { Profile } from '../profile/schemas/profile.schema';
import { of } from 'rxjs';
import 'jest-extended';
import Mock = jest.Mock;

describe('SearchService', () => {
  let searchService: SearchService;
  let profileServiceMock: ProfileService;
  let cocktailDbServiceMock: CocktailDbService;
  let cocktailDbMapperMock: CocktailDbMapper;

  const profileServiceMockedCreateFunction: Mock<any, any> = jest
    .fn()
    .mockReturnValue(
      new Promise<Profile>((resolve) => {
        const profile: Profile = new Profile();
        profile.type = 'test';
        profile.searches = ['test'];
        setTimeout(() => resolve(profile), 5);
      }),
    );

  const profileServiceMockedUpdateFunction: Mock<any, any> = jest
    .fn()
    .mockReturnValue(
      new Promise<Profile>((resolve) => {
        const profile: Profile = new Profile();
        profile.type = 'test';
        profile.searches = ['test'];
        setTimeout(() => resolve(profile), 5);
      }),
    );

  const cocktailDbServiceMockedSearchFunction: Mock<any, any> = jest
    .fn()
    .mockReturnValue(
      of({
        drinks: [],
        ingredients: [],
      }),
    );

  const cocktailDbMapperMockedMapFunction: Mock<any, any> = jest
    .fn()
    .mockReturnValue({
      profileId: 'test',
      searchItems: [
        {
          category: 'drinks',
          items: [],
        },
        {
          category: 'ingredients',
          items: [],
        },
      ],
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: ProfileService,
          useValue: {
            create: profileServiceMockedCreateFunction,
            update: profileServiceMockedCreateFunction,
          },
        },
        {
          provide: CocktailDbService,
          useValue: {
            search: cocktailDbServiceMockedSearchFunction,
          },
        },
        {
          provide: CocktailDbMapper,
          useValue: {
            processCocktailSearchResults: cocktailDbMapperMockedMapFunction,
          },
        },
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    profileServiceMock = module.get<ProfileService>(ProfileService);
    cocktailDbServiceMock = module.get<CocktailDbService>(CocktailDbService);
    cocktailDbMapperMock = module.get<CocktailDbMapper>(CocktailDbMapper);
  });

  describe('search cocktails (no profile id provided)', () => {
    it(
      'should return a profile id & should call ' +
        'the profile service, cocktail service, cocktail mapper; synchronously, in that order.',
      async () => {
        const results: SearchResults = await searchService.search({
          category: 'all',
          type: 'cocktail',
          searchStr: 'test',
        });

        expect(results.profileId).toBeDefined();

        expect(profileServiceMockedCreateFunction).toHaveBeenCalledBefore(
          cocktailDbServiceMockedSearchFunction,
        );

        expect(cocktailDbServiceMockedSearchFunction).toHaveBeenCalledBefore(
          cocktailDbMapperMockedMapFunction,
        );
      },
    );
  });

  describe('search cocktails (w/ profile id)', () => {
    it(
      'The profile update should be be done asynchronously, ' +
        'while the cocktail service & cocktail mapper should execute synchronously',
      async () => {
        const results: SearchResults = await searchService.search({
          category: 'all',
          type: 'cocktail',
          searchStr: 'test',
          profileId: 'test',
        });

        expect(cocktailDbServiceMockedSearchFunction).toHaveBeenCalledBefore(
          cocktailDbMapperMockedMapFunction,
        );

        expect(cocktailDbMapperMockedMapFunction).toHaveBeenCalledBefore(
          profileServiceMockedUpdateFunction,
        );
      },
    );
  });
});
