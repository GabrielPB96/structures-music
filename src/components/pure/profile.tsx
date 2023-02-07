import { User } from "../../models/user.class";

type Props = {
	user: User;
};
const Profile = ({ user }: Props) => {
	return (
		<div>
			<p>{user.username}</p>
			<p>{user.email}</p>
		</div>
	);
};

export default Profile;
