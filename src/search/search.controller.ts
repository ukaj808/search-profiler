import {Controller, Post, Param, Body} from '@nestjs/common';
import {SearchService} from "./search.service";
import {SearchResult} from "./entities/search-result.entity";

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Post(':id')
    search(@Body() s: string, @Param('id') id?: string): Promise<SearchResult> {
        return this.searchService.search(s, id);
    }

}
