export class SearchRequest {
  searchStr: string;
  type: string;
  category?: string;
  profileId?: string;

  constructor(
    searchStr: string,
    type: string,
    category?: string,
    profileId?: string,
  ) {
    this.searchStr = searchStr;
    this.type = type;
    this.category = category;
    this.profileId = profileId;
  }
}
