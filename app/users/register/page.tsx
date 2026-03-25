'use client'

import React from "react";

type ErrorAdd = {
    error: string,
    message: string,
}


export default function Page(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [results, setResults] = React.useState<UserResponseApi | undefined>(undefined);
    const [error, setError] = React.useState<ErrorAdd | undefined>(undefined);
    async function addUser(e: React.ChangeEvent){
        e.preventDefault()
        setError(undefined)
        const response = await fetch("/api/users/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email, name, password
            })
        })
        if(!response.ok) return setError(await response.json())
       return setResults(await response.json() as UserResponseApi)
    }

    return (
    <form onSubmit={addUser} method="POST">
        <label>
            Name
            <input name="submitted-name" autoComplete="name" type="text" className="border" onChange={(e) =>
                setName(e.currentTarget.value)
            }/>
        </label>
        <label>
            Email
            <input name="submitted-email" autoComplete="email" type="email" className="border" onChange={(e) => 
                setEmail(e.currentTarget.value)
            }/>
        </label>
        <label>
            Password
            <input name="submitted-password" autoComplete="password" type="password" className="border" onChange={(e) => 
                setPassword(e.currentTarget.value)
            }/>
        </label>
        <button>Register</button>
        {error ? <div>
            <p>{error.error}</p>
            <p>{error.message}</p>
            </div> : ""}
        {results ? <div>
            <p>Sucess</p>
            <p>User created with sucess</p>
        </div> : ""}
    </form>
    )
}