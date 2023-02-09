import { Link } from "react-router-dom";
import "../../styles/style-home-page.css";

const HomePage = () => {
	return (
		<div className="page">
			<header className="home-page-header">
				<h1>Welcome Structures Music</h1>
			</header>
			<nav className="home-page-nav">
				<div className="home-page-nav-contentlinks">
					<Link to="/signIn">SignIn</Link>
					<Link to="/signUp">SignUp</Link>
				</div>
			</nav>
			<main className="home-page-main">
				<div className="footer">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path
							fill="#0099ff"
							fillOpacity="1"
							d="M0,256L34.3,266.7C68.6,277,137,299,206,266.7C274.3,235,343,149,411,128C480,107,549,149,617,181.3C685.7,213,754,235,823,245.3C891.4,256,960,256,1029,218.7C1097.1,181,1166,107,1234,85.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
						></path>
					</svg>
				</div>
			</main>
		</div>
	);
};

export default HomePage;
