import { useAuth } from '@/context/auth-context'
import { useState } from "react";
import { useForm, SubmitHandler  } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

type RegisterProps = {
	onRegister?: Function;
};

type Inputs = {
	email: string
	firstname: string
	lastname: string
	photo: string
	password: string
	passwordConfirmation: string
}

const Register = ({ onRegister = ({ password }: { password: string }) => {
	console.log(password);
}}: RegisterProps) => {
	const { login } = useAuth()
	const navigate = useNavigate()
	const { register, handleSubmit, watch } = useForm<Inputs>()
	const [error, setError] = useState("");
	const onBlurHandler = () => {
		if (
			watch('password') !==
			watch('passwordConfirmation')
		) {
			setError("Passwords should match");
		} else {
			setError("");
		}
	};


	const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
		const response = await onRegister({
			password: data.password || ''
		});
		if (response && response.error) {
			setError(response.error);
		}
		login()
		navigate('/profile')
		// if (response.data.accessToken)

	};

	return (
		<section>
			<h1>Register</h1>
			<form aria-label="Register" onSubmit={handleSubmit(onSubmitHandler)}>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" {...register('email', {
					required: true,
				})} required />
				<label htmlFor="firstname">Firstname:</label>
				<input type="text" id="firstname" {...register('firstname')} />
				<label htmlFor="lastname">Lastname:</label>
				<input type="text" id="lastname" {...register('lastname')} />
				<label htmlFor="photo">Photo:</label>
				<input type="url" id="photo" {...register('photo')} />
				<label htmlFor="password">Password:</label>
				<input
					required
					type="password"
					id="password"
					{...register('password', {
						onBlur: onBlurHandler,
						required: true,
					})}
				/>
				<label htmlFor="passwordConfirmation">Confirm Password:</label>
				<input
					required
					type="password"
					id="passwordConfirmation"
					{...register('passwordConfirmation', {
						onBlur: onBlurHandler,
						required: true,
					})}
				/>
				{error.length > 0 && <p>{error}</p>}
				<button type="submit">Submit</button>
			</form>
		</section>
	);
};

export default Register;
