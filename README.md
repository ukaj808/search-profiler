# Search Profiler

Search Profiler is a RESTful (Representational State Transfer) service that provides **asynchronous** user search profiling on top of performing actual search requests, within the given domains. At this moment, Search Profiler only supports searches on the Cocktail domain.

## Long Description...
**Problem**: Takeaway wants to provide it's users with an encyclopedia of different food & drink items. Takeaway would like to advertise local restaurants/markets that can provide the searched upon item; within the item encyclopedia entry. There hoping this will help boost sales for the users local restaurants as well as provide another avenue for higher user engagement with Takeaway. Additionally, they want to keep track of every users searches within the encyclopedia so they can provide each user with a tailored experience within the Takeaway domain, based on there interests.

**Solution**: The search profiler aims to be a sort of gateway above all the different food & drink APIs leveraged by Takeaway. With this gateway we can asynchronously process every search request against a user/profile and leverage these profiles in many of ways, to our users benefit. Here are a few way's these profiles can come in handy:

1. Providing users with there recent search history
2. Accurately targeted advertising based on the users search profile
3. Data analysis on worldwide search trends
4. Recomendations based on the users search profile
5. Backloading/Prepping of caches with specific search key/value pairs when a user logs in to Takeaway using there recent searches or what there likely to search for. This will provide faster subsequent searches on the encyclopedia.

## Tech Stack: Reasoning
NestJS: The TypeScript version of the Spring Framework where the driving idea is "Dependency Injection" and "Auto Configuration". Using Java for this service provides no high-level beneit compared to NodeJs since there are no computationally heavy tasks being done in this API. Coupled with the fact that it was faster to do a full stack project without having to switch language contexts, since the front end is also built in TypeScript (React). It's also worth noting that in my opinion, asynchronous programming in js is easier to read/write, and I wanted to showcase the asynchronous profiling feature.

MongoDB: The search profiles are stored in a free personal MongoDB instance. I chose a document database to help with the speed of  development. Writing a data access layer with TypeScript/MongoDB is very simple with the mongodb typescript libraries. A case can be made for most database technologies in our case (Cassandra, Relational, Graph) due to the high read and write volume or to account for profile relationships in the future. 

Cache: I'm using an in-memory cache here just to get the idea across; otherwise I would use redis for our caching strategies.

## Installation

Clone the repo and install the npm packages in the root directory of the project.

```bash
npm install
```

## To Run...
```bash
npm start // This application runs on port 3002.
```

## Usage

```typescript
// returns the profile for a given id
@Get(':id')
findOne(@Param('id') id: string): Promise<Profile>
```
```json
// curl -X GET http://localhost:3002/profile/6244a768fee3d462e2277178
{
  "_id":"6244a768fee3d462e2277178",
  "type":"cocktail",
  "searches":["lemon","grape","grape","juice","eom","grass"]
}
```

```typescript
/* 
    the search request body takes a *optional* profile id and a search query (type, category, searchString)
if no profile id is provided, it will generate one against the search and return a profile id
along with your search results
 */

@Post()
search(@Body() request: SearchRequest): Promise<SearchResults> 
```

```json
// curl -i -X POST -H "Content-Type: application/json" -d "{\"searchStr\": \"whiskey so\", \"type\": \"cocktail\", \"category\": \"all\", \"profileId\": \"6244a768fee3d462e2277178\"}" http://localhost:3002/search
{
   "profileId":"6244a768fee3d462e2277178",
   "searchItems":[
      {
         "category":"drinks",
         "items":[
            {
               "id":"11004",
               "name":"Whiskey Sour",
               "ingredients":[
                  "Blended whiskey",
                  "Lemon",
                  "Powdered sugar",
                  "Cherry",
                  "Lemon"
               ],
               "glass":"Old-fashioned glass",
               "category":"Ordinary Drink",
               "hasAlcohol":"Yes",
               "englishInstructions":"Shake with ice. Strain into chilled glass, garnish and serve. If served 'On the rocks', strain ingredients into old-fashioned glass filled with ice.",
               "thumbnailSource":"https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
               "imageSource":"https://commons.wikimedia.org/wiki/File:15-09-26-RalfR-WLC-0191.jpg"
            }
         ]
      },
      {
         "category":"ingredients",
         "items":[
            
         ]
      }
   ]
}
```

## Run Unit Tests
```bash
npm test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
