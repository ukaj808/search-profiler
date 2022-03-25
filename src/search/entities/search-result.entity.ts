import {Result} from "./result.entity";

export class SearchResult {

    profileId: string;
    results: Result[];

    constructor(profileId: string, results: Result[]) {
        this.profileId = profileId;
        this.results = results;
    }

}
