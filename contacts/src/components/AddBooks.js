import React, { useState } from "react";
import { useMutation } from '@apollo/client'
import { useHistory } from "react-router";
import { ADD_BOOKS } from "../queries/bookQueries";


const AddBooks = ({ updateCacheWith }) => {
    const [title, setTitle] = useState('')
    const [published, setPublished] = useState(0)
    const [author, setAuthor] = useState('')
    const [genres, setGenres] = useState([])
    const [ addBook ] = useMutation(ADD_BOOKS, {
        onError: (error) => {
            console.log(error.graphQLErrors[0])
        },
        update: (store, response) => {
            updateCacheWith(response.data.addBook)
        }
    })
    const history = useHistory()

    const submit = (event) => {
        event.preventDefault()
        addBook({ variables: {title, published, author, genres} })
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        history.push('/books')
    }
    return (
        <div>
            <form onSubmit={submit}>
                title <input type='text' onChange={(e) => setTitle(e.target.value)} /><br />
                published <input type='text' onChange={(e) => setPublished(parseInt(e.target.value))} /><br />
                author <input type='text' onChange={(e) => setAuthor(e.target.value)} /><br />
                genres <input type='text' onChange={(e) => setGenres(genres.concat(e.target.value))} /><br />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddBooks