import {Injectable} from '@nestjs/common';
import {ProfileService} from "../profile/profile.service";
import {SearchResult} from "./entities/search-result.entity";
import {SearchRequest} from "./entities/search-request.entity";
import {Document} from "mongoose";

@Injectable()
export class SearchService {
    constructor(private readonly profileService: ProfileService) {
    }

    async search(request: SearchRequest): Promise<SearchResult> {

        if (request.profileId) {
            this.profileService.update(request).then(() => {
                console.log(`Successfully profiled this search against id ${request.profileId}`)
            }).catch((err) => {
                console.log(err);
                console.log(`Failed to profile this search against id ${request.profileId}`)
            });
        } else {
            console.log("Creating new profile...")
            let document: Document = await this.profileService.create(request);
            request.profileId = document.id;
        }

        let searchResults = await [];
        return new SearchResult(request.profileId, searchResults);
    }

}
