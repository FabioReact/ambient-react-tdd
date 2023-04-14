import { useAuth } from '@/context/auth-context'

const Profile = () => {
	const { token } = useAuth()
	return (
		<section>
			<h1>Profile</h1>
			<p>Token: {token}</p>
		</section>
	)
}

export default Profile