import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase-utils";

import "../../styles/style-dashboard-page.css";

import { User } from "../../models/user.class";
import Profile from "../../components/pure/profile";
import BackBtn from "../../components/pure/back-btn";
import { getUserNameFromEmail } from "../../utils/utils";

const DashBoard = () => {
	const navigation = useNavigate();
	const { user } = useContext(AuthContext);
	const [USER, setUSER] = useState<User>();

	useEffect(() => {
		if (user) {
			setUSER(() => {
				return new User(
					user.displayName || getUserNameFromEmail(user.email),
					user.email || "",
					user?.uid,
					{}
				);
			});
		}
	}, [user]);

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
					<Link to="/musics">Music</Link>
					<div className="dashboard-nav-links-separator"></div>
					<Link to="/profile">Profile</Link>
				</div>
				<BackBtn action={hadleLogout} />
			</nav>
			<main className="dashboard-main">
				{USER ? <Profile user2={USER} /> : "..."}
				<section className="content">
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
						fugit, numquam laudantium similique enim voluptatum eum aliquam
						praesentium commodi iste! Rerum adipisci enim laudantium vitae,
						repudiandae temporibus vero totam distinctio!
					</p>
				</section>
			</main>
		</div>
	);
};

export default DashBoard;
