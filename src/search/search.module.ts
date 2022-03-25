import { Module } from '@nestjs/common';
import {SearchController} from "./search.controller";
import {SearchService} from "./search.service";
import {ProfileModule} from "../profile/profile.module";
import {ProfileService} from "../profile/profile.service";

@Module({
    imports: [ProfileModule],
    controllers: [SearchController],
    providers: [SearchService, ProfileService]
})
export class SearchModule {}
