import React from "react";
import { useQuery, gql } from "@apollo/client";
import BasicTable from "./Table";

const All_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`
const columns = ['Name', 'Born', '# of Books']
const rowNames = ['name', 'born', 'bookCount']
const Authors = () => {
    const result = useQuery(All_AUTHORS);
    if (result.loading) {
      return <div>Loading...</div>
    }
    return (
        <div>
            <BasicTable listOfColumns={columns} rows={result.data.allAuthors} rowNames={rowNames} />
        </div>
    )
}

export default Authors