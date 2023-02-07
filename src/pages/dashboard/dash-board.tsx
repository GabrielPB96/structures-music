import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase-utils";

import "../../styles/style-dashboard-page.css";
import { User } from "../../models/user.class";
import Profile from "../../components/pure/profile";

const DashBoard = () => {
	const navigation = useNavigate();
	const { user } = useContext(AuthContext);
	let U = new User("", "", "", {});
	if (user)
		U = new User(user.displayName || "", user.email || "", user?.uid, {});

	console.log(user);
	const hadleLogout = async () => {
		try {
			let r = await logout();
			navigation("/");
		} catch (error: any) {
			alert(error.code);
		}
	};
	return (
		<div className="page dashboard">
			<header className="dashboard-header">
				<h1>DashBoard</h1>
			</header>
			<nav className="dashboard-nav">
				<div className="dashboard-nav-links">
					<Link to="">Music</Link>
					<div className="dashboard-nav-links-separator"></div>
					<Link to="">Profile</Link>
				</div>
				<button className="dashboard-nav-logout" onClick={hadleLogout}>
					<span className="dashboard-logout-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
							/>
							<path
								fillRule="evenodd"
								d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
							/>
						</svg>
					</span>
				</button>
			</nav>
			<main className="dashboard-main">
				<Profile user={U} />
			</main>
		</div>
	);
};

export default DashBoard;
