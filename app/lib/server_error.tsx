export type serverResponse  = {
    status: number,
    headers: object
}



export default function handleServer<T extends UserNextApi>(data: T, status: number) {
    return {...data, status, headers: { 'Content-Type': 'application/json' }}
}