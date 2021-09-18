import { gql } from '@apollo/client'

export const ADD_BOOKS = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            author
        }
    }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      published,
      author
    }
  }
`