import "./App.css";
import Register from "@/pages/Register";
import { registerUser } from "@/api/user";
import {
  Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Layout from '@/layouts/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'

const onRegister = (data: any) => {
  try {
    return registerUser(data);
  } catch (e) {
    return { error: "Error in registerUser" };
  }
};

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='/register' element={<Register onRegister={onRegister} />} />
    <Route path='/profile' element={<Profile />} />
  </Route>
));

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
