import Register from "@/pages/Register";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { renderWithRouter } from "../utils/utils";

describe("Register Page", () => {
	it("should have a Register title", () => {
		renderWithRouter(<Register />);
		const title = screen.getByRole("heading");
		expect(title).toHaveTextContent(/Register/i);
	});

	it("should have a required input of type email", () => {
		// arrange - Etat initial
		renderWithRouter(<Register />);

		// act - Action à Effectuer
		const emailInput: HTMLInputElement = screen.getByLabelText(/email/i);

		// assert - Test de l'état final
		expect(emailInput.type).toBe("email");
		expect(emailInput).toBeRequired();
	});

	it("should have two required inputs of type password, password and passwordConfirmation", () => {
		// arrange - Etat initial
		const { container } = renderWithRouter(<Register />); // ⚠️ Non recommandé

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
		const { user } = renderWithRouter(<Register />);

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
		const { user } = renderWithRouter(<Register />);

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
		renderWithRouter(<Register />);
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
		renderWithRouter(<Register />);

		// act
		const photoInput: HTMLInputElement = screen.getByLabelText(/photo/i);

		// assert
		expect(photoInput.type).toBe("url");
	});

	it("should have a button within a form to submit the form", async () => {
		// arrange
		const onRegister = vi.fn();
		const { getByRole, user } = renderWithRouter(
			<Register onRegister={onRegister} />,
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
			<Register onRegister={onRegister} />,
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
		const history = ['/register'];

		const { getByRole } = render(
			<MemoryRouter initialEntries={history}>
				<Register />
			</MemoryRouter>,
		);
		const user = userEvent.setup();

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
		await user.tab()
		await user.click(submitButton);

		// assert
		await waitFor(() => {
			// expect(screen.getByText(/profile/i)).toBeInTheDocument();
			// toEquel -> sert à comparer des objects/arrays
			expect(history).toEqual(['/register', '/profile'])
		});
	});
});
