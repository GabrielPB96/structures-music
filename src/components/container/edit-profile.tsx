import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getUserNameFromEmail } from "../../utils/utils";
import BackBtn from "../pure/back-btn";

const EditProfile = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="page">
			<header>
				<h1>Profile</h1>
				<BackBtn />
			</header>
			<section className="container-form">
				<p>{user.displayName || getUserNameFromEmail(user.email)}</p>
			</section>
		</div>
	);
};

export default EditProfile;
