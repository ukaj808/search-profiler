import {Injectable} from '@nestjs/common';
import {ProfileService} from "../profile/profile.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {SearchResult} from "./entities/search-result.entity";
import {SearchRequest} from "./entities/search-request.entity";

@Injectable()
export class SearchService {
    constructor(private readonly profileService: ProfileService) {
    }

    async search(request: SearchRequest): Promise<SearchResult> {

        if (request.profileId) {
            this.profileService.update(request.profileId, request).then(() => {
                console.log(`Successfully profiled this search against id ${request.profileId}`)
            }).catch(() => {
                console.log(`Failed to profile this search against id ${request.profileId}`)
            });
        } else {
            let createProfileDto: CreateProfileDto = new CreateProfileDto(request);
            request.profileId = await this.profileService.create(createProfileDto);
        }

        let searchResults = await [];
        return new SearchResult(request.profileId, searchResults);
    }

}
