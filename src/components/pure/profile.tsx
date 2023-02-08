import { User } from "../../models/user.class";

import image from "../../assets/react.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
type Props = {
	user2: User;
};
const Profile = ({ user2 }: Props) => {
	const { user } = useContext(AuthContext);

	return (
		<article className="card-user">
			<div className="img-user-container">
				<img src={image} alt="" />
			</div>
			<div className="info-user">
				<p>{user2.username}</p>
				<p>{user && user.displayName}</p>
			</div>
		</article>
	);
};

export default Profile;
