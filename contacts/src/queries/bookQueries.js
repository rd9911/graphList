import { gql } from '@apollo/client'

export const ADD_BOOKS = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            id
            title
            published
            author {
              name
            }
            genres
        }
    }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query ($genre: String) {
    allBooks ( genre: $genre ) {
      title
      published
      author {
        name
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`