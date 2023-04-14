import { ReactElement, createContext, useContext, useState } from 'react'

export const AuthContext = createContext<{
	token: string|null
	login: () => void
	logout: () => void
}>(null!)

export const AuthProvider = ({children}: {children: ReactElement}) => {
	const [token, setToken] = useState<string|null>(null)
	const login = () => {
		setToken('secret-token')
	}
	const logout = () => {
		setToken(null)
	}
	return (
		<AuthContext.Provider value={{
			token,
			login,
			logout,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)