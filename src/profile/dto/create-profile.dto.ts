import {Profile} from "../entities/profile.entity";
import {SearchRequest} from "../../search/entities/search-request.entity";

export class CreateProfileDto {

    profile: Profile;

    constructor(searchRequest: SearchRequest) {
        this.profile = new Profile(searchRequest.type, searchRequest.searchStr);
    }

}
