import { Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import LoginPage from "./pages/Login";
import { registerUser } from "./api/user";
import PrivateRoute from "./hoc/PrivateRoute";
// import Optimisations from './pages/Optimisations'
import { lazy } from 'react'

const Optimisations = lazy(() => import('./pages/Optimisations'))

const onRegister = (data: any) => {
	try {
		return registerUser(data);
	} catch (e) {
		return { error: "Error in registerUser" };
	}
};

export const AppRoutes = () => (
	<Route path="/" element={<Layout />}>
		<Route index element={<Home />} />
		<Route path="/register" element={<Register onRegister={onRegister} />} />
		<Route
			path="/profile"
			element={
				<PrivateRoute>
					<Profile />
				</PrivateRoute>
			}
		/>
		<Route path="/login" element={<LoginPage />} />
		<Route path="/optimisations" element={<Optimisations />} />
	</Route>
);
