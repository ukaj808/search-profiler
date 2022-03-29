export interface SearchResults {

    profileId: string;
    searchItems?: SearchItem[];

}

export interface SearchItem {
    category: string;
    items: any[];
}
