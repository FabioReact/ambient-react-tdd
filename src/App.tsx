import "./App.css";
import {
	BrowserRouter,
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
// import PrivateRoute from "./hoc/PrivateRoute";
import { AuthProvider } from "@/context/auth-context";
import { AppRoutes } from "@/Routes";
import { Provider } from 'react-redux';
import { store } from '@/redux/store'

const router = createBrowserRouter(
	createRoutesFromElements(
		AppRoutes(),
	),
);

function App() {
	return (
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	);
}

export default App;
