import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchRequest, SearchResults } from './search.api';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  search(@Body() request: SearchRequest): Promise<SearchResults> {
    return this.searchService.search(request);
  }
}
