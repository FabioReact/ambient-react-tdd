import { ReactElement, createContext, useContext } from 'react'

const AuthContext = createContext<{
	token: string
}>(null!)

export const AuthProvider = ({children}: {children: ReactElement}) => {
	return (
		<AuthContext.Provider value={{
			token: 'secret-token'
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)