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

const App = () => {
	const { user } = useContext(AuthContext);
	//console.log(user);
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={!user ? <HomePage /> : <Navigate to="/dashboard" />}
				/>
				<Route
					path="/signIn"
					element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
				/>
				<Route
					path="/signUp"
					element={!user ? <RegisterPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/dashboard"
					element={user ? <DashBoard /> : <Navigate to="/signIn" />}
				/>
				<Route
					path="/musics"
					element={user ? <FilesPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/profile"
					element={user ? <p>PROFILE</p> : <Navigate to="/" />}
				/>
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;
