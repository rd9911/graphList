import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import BasicTable from "./BasicTable";
import { All_AUTHORS, EDIT_AUTHOR } from "../queries/authorQueries";
import { useHistory } from "react-router";
import Select from 'react-select'

export const UpdateAuthor = ({ authors }) => {
  const [bornTo, setBornTo] = useState(0)
  const [name, setSelectedName] = useState(null)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: All_AUTHORS} ]
  })
  const history = useHistory()


  const update = (event) => {
    event.preventDefault()
    updateAuthor({ variables: {name, bornTo} })
    setBornTo(0)
    setSelectedName('')
    history.push('/authors')
  }

  return (
    <div>
      {console.log(authors[0])}
      <Select defaultValue={authors[0]} onChange={(e) => setSelectedName(e.value)} options={authors[0]} />
      <form onSubmit={update}>
        born year <input type='text' onChange={(e) => setBornTo(parseInt(e.target.value))} /><br />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

const Authors = () => {
  const columns = ['Name', 'Born', '# of Books']
  const rowNames = ['name', 'born', 'bookCount']
  const result = useQuery(All_AUTHORS);
  if (result.loading) {
    return <div>Loading...</div>
  }
  const names = [result.data.allAuthors.map(author => ({value: author.name, label: author.name}))]

  return (
      <div>
          <BasicTable listOfColumns={columns} rows={result.data.allAuthors} rowNames={rowNames} />
          <div>
            <UpdateAuthor authors={names} />
          </div>
      </div>
  )
}

export default Authors