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
const App = () => {
	const { user } = useContext(AuthContext);
	console.log(user);
	return (
		<div className="main-app">
			<Router>
				<Routes>
					<Route
						path="/"
						element={user ? <Navigate to="/dashboard" /> : <HomePage />}
					/>
					<Route
						path="/signIn"
						element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
					/>
					<Route
						path="/signUp"
						element={user ? <Navigate to="/" /> : <RegisterPage />}
					/>
					<Route
						path="/dashboard"
						element={user ? <DashBoard /> : <Navigate to="/signIn" />}
					/>
					<Route path="/*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
