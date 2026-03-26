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
    const [file, setFile] = React.useState<File | null>(null);

    const [results, setResults] = React.useState<any>();
    const [error, setError] = React.useState<ErrorAdd>();

    async function addUser(e: React.SubmitEvent <HTMLFormElement>){
        e.preventDefault()
        setError(undefined)

        const response = await fetch("/api/users/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email, name, password
            })
        })

        const data = await response.json()

        if(!response.ok) return setError(data)
        return setResults(data)
    }

    async function uploadImage(){
        if (!file) return null

        const formData = new FormData()
        formData.append("image", file)

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        if(!response.ok){
            return setError(data)
        }

        alert("Imagem enviada com sucesso 🚀")
    }

    return (
    <div>
        {/* FORM DE REGISTER */}
        <form onSubmit={addUser}>   
            <label>
                Name
                <input type="text" className="border"
                    onChange={(e) => setName(e.currentTarget.value)}
                />
            </label>

            <label>
                Email
                <input type="email" className="border"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
            </label>

            <label>
                Password
                <input type="password" className="border"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </label>

            <button type="submit">Register</button>
        </form>

        {/* UPLOAD DE IMAGEM */}
        <div className="mt-4">
            <input 
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        setFile(e.target.files[0])
                    }
                }}
            />

            <button onClick={uploadImage}>
                Upload Image
            </button>
        </div>

        {/* ERRO */}
        {error && (
            <div>
                <p>{error.error}</p>
                <p>{error.message}</p>
            </div>
        )}

        {/* SUCESSO */}
        {results && (
            <div>
                <p>Success</p>
                <p>User created successfully</p>
            </div>
        )}
    </div>
    )
}