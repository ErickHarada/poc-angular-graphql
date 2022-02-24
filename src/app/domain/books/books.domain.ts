import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';


export class BooksDomain {

    constructor(private environment: string) { }

    getBooks(httpLink: HttpLink) {
        return {
            books: {
                link: httpLink.create({ uri: `${this.environment}/books` }),
                cache: new InMemoryCache()
            }
        }
    }
}