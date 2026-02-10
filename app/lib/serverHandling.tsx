import { NextResponse } from "next/server"

export type serverResponse  = {
    status: number,
    headers: object
}

export default function handleServer<T>(data: T, status: number) {
    return new NextResponse(JSON.stringify(data), {status: status, headers: { 'Content-Type': 'application/json' }})
}