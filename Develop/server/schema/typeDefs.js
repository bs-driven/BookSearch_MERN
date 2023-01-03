const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(book: String!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String!
    link: String
    title: String
    
  }
  type Query {
    me: User
    users: [User]!
    user(userId: ID!): User
  }
  
`;

module.exports = typeDefs;