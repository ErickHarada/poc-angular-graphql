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
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
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

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((u) => u.email === args.email);
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
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log("Server started at ", url));
