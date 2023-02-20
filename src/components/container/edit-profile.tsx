import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getUserNameFromEmail } from "../../utils/utils";
import BackBtn from "../pure/back-btn";

import "../../styles/style-edit-profile.css";

import { updateProfile } from "../../firebase/firebase-utils";
import { useNavigate } from "react-router-dom";
import Loading from "../pure/loading";
import CardProfile from "../pure/card-profile";

const EditProfile = () => {
	const { user } = useContext(AuthContext);
	const initValues = {
		username: `${user.displayName || getUserNameFromEmail(user.email)}`,
		email: `${user.email}`,
		photoURL: `${user.photoURL || ""}`,
	};

	const [username, setUserName] = useState(initValues.username);
	const [email, setEmail] = useState(initValues.email);
	const [sending, setSending] = useState(false);

	const navigation = useNavigate();

	const cancel = () => {
		navigation(-1);
	};

	return (
		<div className="edit-profile-page">
			<header className="edit-profile-header">
				<h1>Profile</h1>
				<BackBtn />
			</header>
			<section className="edit-profile-container-form">
				<div className="container-card-profile">
					<CardProfile />
				</div>
				<form
					onSubmit={async (event) => {
						event.preventDefault();
						setSending(true);
						try {
							await updateProfile({
								displayName: username.trim(),
							});
							const userStorage = JSON.parse(
								localStorage.getItem("user") || ""
							);
							const upUser = { ...userStorage, displayName: username };
							localStorage.setItem("user", JSON.stringify(upUser));
						} catch (error) {
							console.log(error);
						} finally {
							setSending(false);
						}
					}}
				>
					<div className="container-inputs container-input-username">
						<label htmlFor="username">UserName</label>
						<input
							type="text"
							id="username"
							value={username}
							required
							onChange={(event) => {
								const name = event.target.value;
								setUserName(name);
							}}
						/>
					</div>
					<div className="container-inputs">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" value={email} disabled />
					</div>
					<div className="container-buttons">
						<button type="submit" className="button">
							Save
						</button>
						<button onClick={cancel} className="button">
							Cancel
						</button>
					</div>
				</form>
			</section>
			{sending && <Loading />}
		</div>
	);
};

export default EditProfile;
