import { APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';


const uri = 'http://localhost:4000';
const uri2 = 'http://localhost:3000';

export function createApolloDefault(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache()
  };
}

export function createApolloName(httpLink: HttpLink) {
  return {
    endpoint2: {
      name: 'endpoint2',
      link: httpLink.create({ uri: uri2 }),
      cache: new InMemoryCache()
    }
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloDefault,
      deps: [HttpLink]
    },
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApolloName,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule { }


// FUNCIONOU

// @NgModule({})
// export class GraphQLModule {

//   constructor(
//     apollo: Apollo,
//     httpLink: HttpLink
//   ) {

//     const uri = 'http://localhost:4000';
//     const uri2 = 'http://localhost:4000';

//     apollo.createDefault({
//       link: httpLink.create({ uri }),
//       cache: new InMemoryCache()
//     });

//     apollo.createNamed('endpoint2', {
//       link: httpLink.create({ uri: uri2 }),
//       cache: new InMemoryCache()
//     });
//   }
// }
