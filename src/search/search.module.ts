import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';
import { CocktailDbService } from './cocktaildb/cocktaildb.service';
import { HttpModule } from '@nestjs/axios';
import { CocktailDbMapper } from './cocktaildb/cocktaildb.mapper';

@Module({
  imports: [ProfileModule, HttpModule],
  controllers: [SearchController],
  providers: [
    SearchService,
    ProfileService,
    CocktailDbService,
    CocktailDbMapper,
  ],
})
export class SearchModule {}
