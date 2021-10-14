import { gql } from '@apollo/client'

export const USER_LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login( username: $username, password: $password ) { 
            value 
        }
    } 
`

export const USER = gql`
    query {
        me {
            username
            favoriteGenre
         }
    }
`