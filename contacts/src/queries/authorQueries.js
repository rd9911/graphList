import { gql } from "@apollo/client";

export const EDIT_AUTHOR = gql`
    mutation($name: String!, $bornTo: Int!) {
        editAuthor(name: $name, bornTo: $bornTo) {
            name,
            born,
            bookCount
    }
  }
`
export const All_AUTHORS = gql`
    query {
    allAuthors {
        name,
        born,
        bookCount
    }
}
`