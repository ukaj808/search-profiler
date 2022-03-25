import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import {SearchModule} from "./search/search.module";

@Module({
  imports: [ProfileModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
