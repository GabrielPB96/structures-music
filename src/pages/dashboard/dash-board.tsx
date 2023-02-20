import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase-utils";

import "../../styles/style-dashboard-page.css";

import CardProfile from "../../components/pure/card-profile";
import BackBtn from "../../components/pure/back-btn";
import FilesInfo from "../../components/pure/files-info";

const DashBoard = () => {
	const navigation = useNavigate();

	const hadleLogout = async () => {
		try {
			await logout();
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
				<BackBtn action={hadleLogout}>logout</BackBtn>
			</nav>
			<main className="dashboard-main">
				<CardProfile />
				<FilesInfo />
			</main>
		</div>
	);
};

export default DashBoard;
