import React from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries/bookQueries";
import BasicTable from "./BasicTable";
import { columns, rowNames } from "./Books";

const Recommendation = ({ user }) => {
    // const [getBooks, {loading, error, recommendedBooks}] = useLazyQuery(BOOKS_BY_GENRE)
    const recommendedBooks = useQuery(BOOKS_BY_GENRE, { variables: {genre: user.favoriteGenre} })

    if (recommendedBooks.loading) return <p>Loading...</p>
    if (recommendedBooks.error) return <p>`Error! ${recommendedBooks.error}`</p>
    // if (user) {
    //     getBooks({ variables: { genre: "drama" } })
    // }
    return (
        <div>
            {console.log(recommendedBooks.data)}
            <BasicTable listOfColumns={columns} rows={recommendedBooks.data.allBooks} rowNames={rowNames} />
        </div>
    )
}

export default Recommendation