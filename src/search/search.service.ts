import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { SearchResults } from './entities/search-result.entity';
import { SearchRequest } from './entities/search-request.entity';
import { Document } from 'mongoose';
import { CocktailDbService } from './cocktaildb/cocktaildb.service';
import { CocktailDbMapper } from './cocktaildb/cocktaildb.mapper';
import { firstValueFrom } from 'rxjs';
import { CocktailResult } from './entities/result.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly cocktailDbService: CocktailDbService,
    private readonly cocktailDbMapper: CocktailDbMapper,
  ) {}

  async search(request: SearchRequest): Promise<SearchResults> {
    if (request.profileId) {
      this.profileService
        .update(request)
        .then(() => {
          console.log(
            `Successfully profiled this search against id ${request.profileId}`,
          );
        })
        .catch((err) => {
          console.log(
            `Failed to profile this search against id ${request.profileId}`,
          );
        });
    } else {
      console.log('Creating new profile...');
      const document: Document = await this.profileService.create(request);
      request.profileId = document.id;
    }

    switch (request.type) {
      case 'cocktail':
        const cocktailResult: CocktailResult = await firstValueFrom(
          this.cocktailDbService.search(request.searchStr, request.category),
        );
        return this.cocktailDbMapper.processCocktailSearchResults(
          request.profileId,
          cocktailResult,
        );
    }

    throw new Error();
  }
}
