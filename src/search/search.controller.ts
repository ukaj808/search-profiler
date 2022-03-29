import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResults } from './entities/search-result.entity';
import { SearchRequest } from './entities/search-request.entity';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  search(@Body() request: SearchRequest): Promise<SearchResults> {
    return this.searchService.search(request);
  }

}
