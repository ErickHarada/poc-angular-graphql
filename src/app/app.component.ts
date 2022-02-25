import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  responseList: any[];
  response: any;

  constructor(
    private graphQLService: GraphqlService
  ) { }

  ngOnInit(): void { }

  getAllUsers(): void {
    this.graphQLService.getAllUsers().subscribe(res => {
      console.log('USERS: ', res);
      this.title = 'USERS';
      this.responseList = res;
    });
  }

  getUserByEmail(): void {
    this.graphQLService.getUserByEmail('erick@harada.com').subscribe(res => {
      console.log('USER: ', res);
      this.response = res;
    })
  }

  setUser(): void {
    this.graphQLService.createUser('Teste', 'teste@teste.com').subscribe(res => {
      console.log('CREATE USER: ', res);
    })
    this.graphQLService.refetch('getAllUsers');
  }

  getAllBooks(): void {
    this.graphQLService.getAllBooks().subscribe(res => {
      console.log('BOOKS  : ', res);
      this.title = 'BOOKS';
      this.responseList = res;
    });
  }

  getBookByName(): void {
    this.graphQLService.getBookByName('Livro1').subscribe(res => {
      console.log('BOOK: ', res);
      this.response = res;
    });
  }

  setBook(): void {
    this.graphQLService.createBook('Teste1', 'TesteAuthor', 'TesteCategory').subscribe(res => {
      console.log('CREATE BOOK: ', res);
      this.graphQLService.refetch('getAllBooks');
    });
  }

  destructuring(item: any): string[] {
    return Object.keys(item);
  }
}
