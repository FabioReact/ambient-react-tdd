import Register from "@/pages/Register";
import { screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithRouter } from "../utils/utils";
import Profile from "@/pages/Profile";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import { AppRoutes } from "@/Routes";
import { server } from '@/tests/utils/setup-server'

beforeAll(() => {
	server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
	server.close();
});


const RegisterWithAuth = () => (
	<AuthProvider>
		<Register />
	</AuthProvider>
);

describe("Register Page", () => {
	it("should have a Register title", () => {
		renderWithRouter(<RegisterWithAuth />);
		const title = screen.getByRole("heading");
		expect(title).toHaveTextContent(/Register/i);
	});

	it("should have a required input of type email", () => {
		// arrange - Etat initial
		renderWithRouter(<RegisterWithAuth />);

		// act - Action à Effectuer
		const emailInput: HTMLInputElement = screen.getByLabelText(/email/i);

		// assert - Test de l'état final
		expect(emailInput.type).toBe("email");
		expect(emailInput).toBeRequired();
	});

	it("should have two required inputs of type password, password and passwordConfirmation", () => {
		// arrange - Etat initial
		const { container } = renderWithRouter(<RegisterWithAuth />); // ⚠️ Non recommandé

		// act - Action à Effectuer
		const nodesPassword = container.querySelectorAll('input[type="password"]');

		// assert - Test de l'état final
		expect(nodesPassword.length).toBe(2);
		expect(nodesPassword[0]).toBeRequired();
		expect(nodesPassword[1]).toBeRequired();
		// expect(nodesPassword[1].id).toBe('passwordConfirmation')
	});

	it("should have error message if passwords don't match", async () => {
		// arrange - Etat initial
		const { user } = renderWithRouter(<RegisterWithAuth />);

		// act
		const passwordInput: HTMLInputElement =
			screen.getByLabelText(/^password:$/i);
		const passwordConfirmationInput: HTMLInputElement =
			screen.getByLabelText(/Confirm Password:/i);
		await user.type(passwordInput, "secretPassword");
		await user.type(passwordConfirmationInput, "notTheSame");

		// assert
		expect(screen.getByText("Passwords should match")).toBeInTheDocument();
	});

	it("should not have error message if passwords match", async () => {
		// arrange - Etat initial
		const { user } = renderWithRouter(<RegisterWithAuth />);

		// act
		const passwordInput: HTMLInputElement =
			screen.getByLabelText(/^password:$/i);
		const passwordConfirmationInput: HTMLInputElement =
			screen.getByLabelText(/Confirm Password:/i);
		await user.type(passwordInput, "secretPassword");
		await user.type(passwordConfirmationInput, "secretPassword");
		await user.tab();

		// assert
		expect(
			screen.queryByText("Passwords should match"),
		).not.toBeInTheDocument();
	});

	it("should have input type text for firstname and lastname", () => {
		// arrange - Etat initial
		renderWithRouter(<RegisterWithAuth />);
		// const user = userEvent.setup()

		// act
		const firstnameInput: HTMLInputElement =
			screen.getByLabelText(/firstname/i);
		const lastnameInput: HTMLInputElement = screen.getByLabelText(/lastname/i);

		// assert
		expect(firstnameInput.type).toBe("text");
		expect(lastnameInput.type).toBe("text");
	});

	it("should have input type url for photo", () => {
		// arrange - Etat initial
		renderWithRouter(<RegisterWithAuth />);

		// act
		const photoInput: HTMLInputElement = screen.getByLabelText(/photo/i);

		// assert
		expect(photoInput.type).toBe("url");
	});

	it("should have a button within a form to submit the form", async () => {
		// arrange
		const onRegister = vi.fn();
		const { getByRole, user } = renderWithRouter(
			<AuthProvider>
				<Register onRegister={onRegister} />
			</AuthProvider>,
		);

		// act
		const form = getByRole("form", {
			name: "Register",
		});
		const submitButton: HTMLButtonElement = within(form).getByRole("button");
		const emailInput: HTMLInputElement = within(form).getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput: HTMLInputElement =
			within(form).getByLabelText(/^password:$/i);
		const passwordConfirmationInput: HTMLInputElement =
			within(form).getByLabelText(/confirm password/i);
		await user.type(emailInput, "some@email.com");
		await user.type(passwordInput, "password");
		await user.type(passwordConfirmationInput, "password");
		await user.click(submitButton);

		// assert
		expect(submitButton).toBeInTheDocument();
		expect(onRegister).toHaveBeenCalled();
		expect(onRegister).toHaveBeenCalledWith({ password: "password" });
	});

	it("should have error message if onRegister returns an error", async () => {
		// Success { "accessToken": "xxx.xxx.xxx" }
		// Error { "error": "Error message" }
		// arrange
		const onRegister = vi.fn().mockImplementationOnce(async () => {
			return await { error: "Some error" };
		});
		const { getByRole, user } = renderWithRouter(
			<AuthProvider>
				<Register onRegister={onRegister} />
			</AuthProvider>,
		);

		// act
		const form = getByRole("form", {
			name: "Register",
		});
		const submitButton: HTMLButtonElement = within(form).getByRole("button");
		const emailInput: HTMLInputElement = within(form).getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput: HTMLInputElement =
			within(form).getByLabelText(/^password:$/i);
		const passwordConfirmationInput: HTMLInputElement =
			within(form).getByLabelText(/confirm password/i);
		await user.type(emailInput, "some@email.com");
		await user.type(passwordInput, "password");
		await user.type(passwordConfirmationInput, "password");
		await user.click(submitButton);

		// assert
		within(form).getByText("Some error");
	});

	it("should redirect when submit button is clicked", async () => {
		// arrange
		const { getByRole, user } = renderWithRouter(
			<AuthProvider>
				<Routes>{AppRoutes()}</Routes>
			</AuthProvider>,
			{ route: "/register" },
		);

		// act
		const form = getByRole("form", {
			name: "Register",
		});
		const submitButton: HTMLButtonElement = within(form).getByRole("button");
		const emailInput: HTMLInputElement = within(form).getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput: HTMLInputElement =
			within(form).getByLabelText(/^password:$/i);
		const passwordConfirmationInput: HTMLInputElement =
			within(form).getByLabelText(/confirm password/i);
		await user.type(emailInput, "some@email.com");
		await user.type(passwordInput, "password");
		await user.type(passwordConfirmationInput, "password");
		await user.click(submitButton);

		// assert
		expect(await screen.findByText(/profile/i)).toBeInTheDocument();
	});
});
