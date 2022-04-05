import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchResults } from './search.api';

describe('SearchController', () => {
  let searchController: SearchController;
  let searchServiceMock: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            search: jest.fn().mockReturnValue(
              new Promise((resolve) => {
                const searchResults: SearchResults = {
                  profileId: 'test',
                  searchItems: [
                    {
                      category: 'test',
                      items: [],
                    },
                  ],
                };
                resolve(searchResults);
              }),
            ),
          },
        },
      ],
    }).compile();
    searchController = module.get<SearchController>(SearchController);
    searchServiceMock = module.get<SearchService>(SearchService);
  });

  describe('search', () => {
    it('should return a profile id & search service should be called once', async () => {
      const results: SearchResults = await searchController.search({
        profileId: 'test',
        category: 'test',
        type: 'test',
        searchStr: 'test',
      });
      expect(results.profileId).toBe('test');

      expect(searchServiceMock.search).toBeCalledTimes(1);
    });
  });
});
