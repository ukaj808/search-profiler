import { CacheModule, Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';
import { CocktailDbService } from './cocktaildb/service/cocktaildb.service';
import { HttpModule } from '@nestjs/axios';
import { CocktailDbMapper } from './cocktaildb/mapper/cocktaildb.mapper';

@Module({
  imports: [ProfileModule, HttpModule, CacheModule.register()],
  controllers: [SearchController],
  providers: [
    SearchService,
    ProfileService,
    CocktailDbService,
    CocktailDbMapper,
  ],
})
export class SearchModule {}
