const { ApolloServer, gql } = require("apollo-server");

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Book {
    _id: ID!
    name: String!
    author: String!
    category: String!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    authour: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
    books: [Book!]!
    getBookByName(name: String!): Book!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createBook(name: String!, author: String!, category: String!): Book!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "Erick Harada",
    email: "erick@harada.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Erick1 Harada1",
    email: "erick1@harada1.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Erick2 Harada2",
    email: "erick2@harada2.com",
    active: false,
  },
];

const books = [
  {
    _id: String(Math.random()),
    name: "Livro1",
    author: "Autor1",
    category: "Ação",
  },
  {
    _id: String(Math.random()),
    name: "Livro2",
    author: "Autor2",
    category: "Suspense",
  },
  {
    _id: String(Math.random()),
    name: "Livro3",
    author: "Autor3",
    category: "Romance",
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((u) => u.email === args.email);
    },
    books: () => books,
    getBookByName: (_, args) => {
      return books.find((b) => b.name === args.name);
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };
      users.push(newUser);
      return newUser;
    },
    createBook: (_, args) => {
      const newBook = {
        _id: String(Math.random()),
        name: args.name,
        author: args.author,
        category: args.category,
      };
      books.push(newBook);
      return newBook;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log("Server started at ", url));
