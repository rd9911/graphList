import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import BasicTable from "./BasicTable";
import { All_AUTHORS, EDIT_AUTHOR } from "../queries/authorQueries";
import { useHistory } from "react-router";

export const UpdateAuthor = () => {
  const [name, setName] = useState('')
  const [bornTo, setBornTo] = useState(0)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: All_AUTHORS} ]
  })
  const history = useHistory()

  const update = (event) => {
    event.preventDefault()
    updateAuthor({ variables: {name, bornTo} })
    setName('')
    setBornTo(0)
    history.push('/authors')
  }

  return (
    <div>
      <form onSubmit={update}>
        name <input type='text' onChange={(e) => setName(e.target.value)} /><br />
        born year <input type='text' onChange={(e) => setBornTo(parseInt(e.target.value))} /><br />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

const Authors = () => {
    const result = useQuery(All_AUTHORS);
    if (result.loading) {
      return <div>Loading...</div>
    }
    const columns = ['Name', 'Born', '# of Books']
    const rowNames = ['name', 'born', 'bookCount']
    return (
        <div>
            <BasicTable listOfColumns={columns} rows={result.data.allAuthors} rowNames={rowNames} />
            <div>
              <UpdateAuthor />
            </div>
        </div>
    )
}

export default Authors