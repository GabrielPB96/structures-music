import { User } from "../../models/user.class";

import image from "../../assets/react.svg";

type Props = {
	user2: User;
};
const Profile = ({ user2 }: Props) => {

	return (
		<article className="card-user">
			<div className="img-user-container">
				<img src={image} alt="" />
			</div>
			<div className="info-user">
				<p>{user2.username}</p>
			</div>
		</article>
	);
};

export default Profile;
