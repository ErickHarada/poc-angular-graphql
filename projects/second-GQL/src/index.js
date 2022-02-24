const { ApolloServer, gql } = require("apollo-server");

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
    author: String!
    category: String!
  }

  type Query {
    hello: String
    books: [Book!]!
    getBookByName(name: String!): Book!
  }

  type Mutation {
    createBook(name: String!, author: String!, category: String!): Book!
  }
`;

const books = [
  {
    _id: String(Math.random()),
    name: "Livro1",
    author: "Autor1",
    category: "Ação"
  },
  {
    _id: String(Math.random()),
    name: "Livro2",
    author: "Autor2",
    category: "Suspense"
  },
  {
    _id: String(Math.random()),
    name: "Livro3",
    author: "Autor3",
    category: "Romance"
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    books: () => books,
    getBookByName: (_, args) => {
      return books.find((b) => b.name === args.name);
    },
  },
  Mutation: {
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
server.listen('3000').then(({ url }) => console.log("Server started at ", url));
