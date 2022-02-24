import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

export class UsersDomain {

    constructor(private environment: string) { }

    getUsers(httpLink: HttpLink) {
        return {
            users: {
                link: httpLink.create({ uri: `${this.environment}/users` }),
                cache: new InMemoryCache()
            },
            users2: {
                link: httpLink.create({ uri: `${this.environment}/users2` }),
                cache: new InMemoryCache()
            }
        }
    }

}