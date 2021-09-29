import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { USER_LOGIN } from "../queries/userQueries";

const Login = ({ setError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(USER_LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('userToken', token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()
        login({ variables: {username, password} })
        setUsername('') // form is not clearing up. Fix it!
        setPassword('')

    }

    return (
        <div>
            <form onSubmit={submit}>
                username <input type='text' onChange={(e) => setUsername(e.target.value) } /><br />
                password <input type='text' onChange={(e) => setPassword(e.target.value) } />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login