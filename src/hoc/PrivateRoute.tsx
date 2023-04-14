import { useAuth } from '@/context/auth-context'
import { useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const { token } = useAuth();
	const location = useLocation();

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
