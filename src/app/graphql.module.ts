import { APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { BooksDomain } from './domain/books/books.domain';
import { UsersDomain } from './domain/users/users.domain';
import { environment } from 'src/environments/environment';


const books = new BooksDomain(environment.ENDPOINT);
const users = new UsersDomain(environment.ENDPOINT);

export function createApolloName(httpLink: HttpLink) {
  return {
    ...books.getBooks(httpLink),
    ...users.getUsers(httpLink),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApolloName,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule { }
