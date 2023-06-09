import { screen, within } from "@testing-library/react";
import { AuthProvider } from "@/context/auth-context";
import { Routes } from "react-router-dom";
import { AppRoutes } from "@/Routes";
import { renderWithProviders } from '../utils/utils-redux'

describe("Login Page", () => {
	it("should have email and password input within a form", async () => {
		// arrange
		const { user } = renderWithProviders(
			<AuthProvider>
				<Routes>
					{AppRoutes()}
				</Routes>
			</AuthProvider>,
			{ route: "/login" },
		);

		const form = screen.getByRole("form", {
			name: /loginform/,
		});

		const emailInput: HTMLInputElement = within(form).getByLabelText(/email/i);
		const passwordInput: HTMLInputElement =
			within(form).getByLabelText(/password/i);
		const button: HTMLButtonElement = within(form).getByRole("button");

		// assert
		expect(emailInput.type).toBe("email");
		expect(emailInput.required).toBe(true);
		expect(passwordInput).toBeRequired();
		expect(button).toBeDisabled();

		// act
		await user.type(emailInput, "fabio@email.com");
		await user.type(passwordInput, "password");

		// assert
		expect(button).toBeEnabled();

		// act
		await user.click(button);

		// assert
		expect(
			screen.getByRole("heading", { name: /Profile/i }),
		).toBeInTheDocument();
	});
});
