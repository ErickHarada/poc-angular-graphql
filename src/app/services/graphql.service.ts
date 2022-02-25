import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable, pluck, take } from 'rxjs';
import { allBooks, createBook, getBookByName } from '../queries/books';
import { allUsers, createUser, getUserByEmail } from '../queries/users';


type Query = {
  [name: string]: QueryRef<any>
}
@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  subscriptions: Query;

  constructor(private apollo: Apollo) { }

  setWatchedQueries(query: Query): void {
    this.subscriptions = {
      ...this.subscriptions,
      ...query
    }
  }

  refetch(sub: string): void {
    this.subscriptions[sub].refetch();
  }

  // USERS

  getAllUsers(): Observable<any> {
    this.setWatchedQueries(
      {
        getAllUsers: this.apollo.use('users').watchQuery({
          query: gql`${allUsers}`,
        })
      }
    );
    return this.subscriptions['getAllUsers'].valueChanges.pipe(take(1), pluck('data', 'users'));
  }

  getUserByEmail(email: string): Observable<any> {
    return this.apollo.use('users').watchQuery({
      query: gql`${getUserByEmail(email)}`
    }).valueChanges.pipe(pluck('data', 'getUserByEmail'));
  }

  createUser(name: string, email: string): Observable<any> {
    return this.apollo.use('users').mutate({
      mutation: gql`${createUser(name, email)}`
    }).pipe(pluck('data', 'createUser'));
  }

  // BOOKS 

  getAllBooks(): Observable<any> {
    this.setWatchedQueries(
      {
        getAllBooks: this.apollo.use('books').watchQuery({
          query: gql`${allBooks}`
        })
      }
    );
    return this.subscriptions['getAllBooks'].valueChanges.pipe(take(1), pluck('data', 'books'));
  }

  getBookByName(name: string): Observable<any> {
    return this.apollo.use('books').watchQuery({
      query: gql`${getBookByName(name)}`
    }).valueChanges.pipe(pluck('data', 'getBookByName'));
  }

  createBook(name: string, author: string, category: string): Observable<any> {
    return this.apollo.use('books').mutate({
      mutation: gql`${createBook(name, author, category)}`
    }).pipe(pluck('data', 'createBook'));
  }
}
