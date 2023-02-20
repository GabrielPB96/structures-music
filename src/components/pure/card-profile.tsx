import image from "../../assets/react.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getUserNameFromEmail } from "../../utils/utils";

import "../../styles/style-card-profile.css"

const CardProfile = () => {
	const { user } = useContext(AuthContext);

	return (
		<article className="card-user">
			<div className="img-user-container">
				<img src={image} alt="" />
			</div>
			<div className="info-user">
				<p>
					{user.displayName
						? user.displayName
						: getUserNameFromEmail(user.email)}
				</p>
			</div>
		</article>
	);
};

export default CardProfile;
