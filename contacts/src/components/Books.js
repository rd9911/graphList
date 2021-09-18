import React from "react";
import { useQuery, gql } from "@apollo/client";
import BasicTable from "./Table";

const All_BOOKS = gql`
  query {
    allBooks {
      title,
      published,
      author
    }
  }
`
const columns = ['Title', 'Published', 'Author']
const rowNames = ['title', 'published', 'author']
const Books = () => {
    const result = useQuery(All_BOOKS);
    if (result.loading) {
      return <div>Loading...</div>
    }
    return (
        <div>
            <BasicTable listOfColumns={columns} rows={result.data.allBooks} rowNames={rowNames} />
        </div>
    )
}

export default Books