import React from "react";
import { useQuery } from "@apollo/client";
import BasicTable from "./BasicTable";
import { ALL_BOOKS } from "../queries/bookQueries";

const columns = ['Title', 'Published', 'Author']
const rowNames = ['title', 'published', 'author']
const Books = () => {
    const result = useQuery(ALL_BOOKS);
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