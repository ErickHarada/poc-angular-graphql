import { gql, Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { allBooks } from '../queries/books';
import { allUsers } from '../queries/users';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private query: string;

  constructor(private apollo: Apollo) { }

  getAllUsers(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`${allUsers}`
    }).valueChanges.pipe(pluck('data', 'users'));
  }

  getAllBooks(): Observable<any> {
    return this.apollo.use('endpoint2').watchQuery({
      query: gql`${allBooks}`
    }).valueChanges.pipe(pluck('data', 'books'));
  }
}
