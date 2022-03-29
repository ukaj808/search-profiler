import {SearchRequest} from "../../search/search.api";

export class CreateProfileDto {
  type: string;
  searches: string[];

  constructor(searchRequest: SearchRequest) {
    this.type = searchRequest.type;
    this.searches = [searchRequest.searchStr];
  }
}
