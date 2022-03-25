import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import {SearchModule} from "./search/search.module";
import {ProfileService} from "./profile/profile.service";

@Module({
  imports: [ProfileModule, SearchModule],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService, ProfileService],
})
export class AppModule {}
