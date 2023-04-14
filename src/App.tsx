import "./App.css";
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
// import PrivateRoute from "./hoc/PrivateRoute";
import { AuthProvider } from "@/context/auth-context";
import { AppRoutes } from "@/Routes";
import { Provider } from 'react-redux';
import { setupStore } from '@/redux/store'

const router = createBrowserRouter(
	createRoutesFromElements(
		AppRoutes(),
	),
);

function App() {
	return (
		<Provider store={setupStore()}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	);
}

export default App;
