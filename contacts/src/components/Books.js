import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import BasicTable from "./BasicTable";
import { ALL_BOOKS } from "../queries/bookQueries";


const columns = ['Title', 'Published', 'Author']
const rowNames = ['title', 'published', 'author']
const Books = () => {
    const [pickedGenre, setPickedGenre] = useState('')
    const result = useQuery(ALL_BOOKS);
    let genres = ['refactoring', 'agile', 'patterns', 'design', 'crime', 'classic', 'all genres']
    if (result.loading) {
      return <div>Loading...</div>
    }
    let booksToShow = !pickedGenre || pickedGenre === 'all genres' ? result.data.allBooks
        : result.data.allBooks.filter(book => book.genres.includes(pickedGenre))

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