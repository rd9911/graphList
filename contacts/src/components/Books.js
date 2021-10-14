import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import BasicTable from "./BasicTable";
import { ALL_BOOKS } from "../queries/bookQueries";

export const columns = ['Title', 'Published', 'Author']
export const rowNames = ['title', 'published', 'author']
const Books = (props) => {
    const [pickedGenre, setPickedGenre] = useState('')
    const books = useQuery(ALL_BOOKS);
    if (books.loading) {
      return <div>Loading...</div>
    }
    let genres = ['refactoring', 'agile', 'patterns', 'design', 'crime', 'classic', 'all genres']
    let booksToShow = !pickedGenre || pickedGenre === 'all genres' ? books.data.allBooks
        : books.data.allBooks.filter(book => book.genres.includes(pickedGenre))

    return (
        <div>
            <BasicTable listOfColumns={columns} rows={booksToShow} rowNames={rowNames} />
            <div>
                <ul>
                    {genres.map(genre => <button key={genre} onClick={() => setPickedGenre(genre)}>{genre}</button>)}
                </ul>
            </div>
        </div>
    )
}

export default Books