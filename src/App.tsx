import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import HomePage from "./pages/home/home-page";
import RegisterPage from "./pages/auth/register-page";
import DashBoard from "./pages/dashboard/dash-board";

import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import ErrorPage from "./pages/404/error-page";
import FilesPage from "./pages/user/filesuser/files-page";
import EditProfile from "./components/container/edit-profile";

const App = () => {
	const { user } = useContext(AuthContext);
	//console.log(user);
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						!user ? <HomePage /> : <Navigate to="/dashboard" replace={true} />
					}
				/>
				<Route
					path="/signIn"
					element={
						!user ? <LoginPage /> : <Navigate to="/dashboard" replace={true} />
					}
				/>
				<Route
					path="/signUp"
					element={
						!user ? <RegisterPage /> : <Navigate to="/" replace={true} />
					}
				/>
				<Route
					path="/dashboard"
					element={
						user ? <DashBoard /> : <Navigate to="/signIn" replace={true} />
					}
				/>
				<Route
					path="/musics"
					element={user ? <FilesPage /> : <Navigate to="/" replace={true} />}
				/>
				<Route
					path="/profile"
					element={user ? <EditProfile /> : <Navigate to="/" replace={true} />}
				/>
				<Route path="/musics/:path" element={<FilesPage />} />
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;
