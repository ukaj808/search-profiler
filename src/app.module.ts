import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import {SearchModule} from "./search/search.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [ProfileModule, SearchModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
