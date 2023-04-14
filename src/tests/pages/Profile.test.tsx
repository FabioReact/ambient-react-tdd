import { AuthContext, AuthProvider } from "@/context/auth-context";
import Profile from "@/pages/Profile";
import { render, screen } from "@testing-library/react";

describe("Profile Page", () => {
	it("should have a title with Profile", () => {
		// arrange
		render(
			<AuthContext.Provider
				value={{
					token: "secret-token",
					login: () => null,
					logout: () => null,
				}}
			>
				<Profile />
			</AuthContext.Provider>,
		);

		const title = screen.getByRole("heading", {
			name: /Profile/i,
		});
		const tokenP = screen.getByText(/secret-token/);
		expect(tokenP).toBeInTheDocument();
		expect(title).toBeInTheDocument();
	});
});
