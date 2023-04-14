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
import { Suspense } from 'react'

const router = createBrowserRouter(
	createRoutesFromElements(
		AppRoutes(),
	),
);

function App() {
	return (
		<Provider store={setupStore()}>
			<AuthProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<RouterProvider router={router} />
				</Suspense>
			</AuthProvider>
		</Provider>
	);
}

export default App;
