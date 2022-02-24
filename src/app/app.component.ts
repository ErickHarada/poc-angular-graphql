import { Component, OnInit } from '@angular/core';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc-angular-graphql';
  users: any[];
  books: any[];

  constructor(
    private graphQLService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.graphQLService.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    });

    this.graphQLService.getAllBooks().subscribe(res => {
      console.log(res);
      this.books = res;
    });
  }
}
