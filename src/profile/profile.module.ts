import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Profile, ProfileSchema} from "./schemas/profile.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])]
})
export class ProfileModule {}
