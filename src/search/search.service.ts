import {Injectable} from '@nestjs/common';
import {ProfileService} from "../profile/profile.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {SearchResult} from "./entities/search-result.entity";

@Injectable()
export class SearchService {
    constructor(private readonly profileService: ProfileService) {
    }

    async search(s: string, type: string, id?: string): Promise<SearchResult> {

        if (id) {
            this.profileService.update(s, id).then(() => {
                console.log(`Successfully profiled this search against id ${id}`)
            }).catch(() => {
                console.log(`Failed to profile this search against id ${id}`)
            });
        } else {
            let createProfileDto: CreateProfileDto = new CreateProfileDto(type, s);
            id = await this.profileService.create(createProfileDto);
        }

        let searchResults = await [];
        return new SearchResult(id, searchResults);
    }

}
