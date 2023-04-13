import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<header>
				<nav>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/register">Register</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
