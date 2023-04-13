import axios from "axios"

type User = {
	email: string
	firstname?: string
	lastname?: string
	photo?: string
	password: string
}

const fetcher = {
	post<T>(url: string, data: unknown) {
		return axios.post<T>(url, data)
	},
	get() {}
}

export const registerUser = (user: User) => {
	return fetcher.post<{ accessToken: string }>('http://localhost:4000/register', user).catch(e => {
		return null
	})
}

export const loginUser = () => {
	
}

export const fetchAllUsers = () => {
	
}

