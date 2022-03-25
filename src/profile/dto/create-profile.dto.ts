import {SearchRequest} from "../../search/entities/search-request.entity";

export class CreateProfileDto {

    type: string;
    searches: string[];

    constructor(searchRequest: SearchRequest) {
        this.type = searchRequest.type;
        this.searches = [searchRequest.searchStr];
    }

}
