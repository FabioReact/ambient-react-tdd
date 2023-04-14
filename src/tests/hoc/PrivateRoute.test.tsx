import { AuthContext, AuthProvider } from "@/context/auth-context";
import PrivateRoute from "@/hoc/PrivateRoute";
import Profile from "@/pages/Profile";
import { render, screen } from "@testing-library/react";
import { renderWithRouter } from "../utils/utils";
import { Route, Routes } from "react-router-dom";
import LoginPage from '@/pages/Login'

describe("PrivateRoute Component", () => {
	it("should redirect if token is not set", () => {
		// arrange
		renderWithRouter(
			<AuthContext.Provider
				value={{
					token: null,
					login: () => null,
					logout: () => null,
				}}
			>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				</Routes>
			</AuthContext.Provider>,
			{route: '/profile'}
		);

		const title = screen.queryByRole("heading", {
			name: /Profile/i,
		});
		expect(title).not.toBeInTheDocument();
	});

	it("should access private route if token is set", () => {
		// arrange
		renderWithRouter(
			<AuthContext.Provider
				value={{
					token: 'xxx.xxx.xxx',
					login: () => null,
					logout: () => null,
				}}
			>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				</Routes>
			</AuthContext.Provider>,
			{route: '/profile'}
		);

		const title = screen.queryByRole("heading", {
			name: /Profile/i,
		});
		expect(title).toBeInTheDocument();
	});
});
