import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();

	const from = location.state?.from?.pathname || "/";

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const formData = new FormData(event.currentTarget);
		// const username = formData.get("username") as string;

		// auth.signin(username, () => {
		// 	navigate(from, { replace: true });
		// });
		login();
		navigate("/profile");
	};

	return (
		<div>
			<p>You must log in to view the page at {from}</p>

			<form onSubmit={handleSubmit} aria-label="loginform">
				<label htmlFor="email">Email:</label>
				<input
					name="email"
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					name="password"
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" disabled={!(email.length && password.length)}>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
