import { User } from "../../models/user.class";

import image from "../../assets/react.svg";
type Props = {
	user: User;
};
const Profile = ({ user }: Props) => {
	return (
		<article className="card-user">
			<div className="img-user-container">
				<img src={image} alt=""/>
			</div>
			<div className="info-user">
				<p>{user.username}</p>
			</div>
		</article>
	);
};

export default Profile;
