import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getUserNameFromEmail } from "../../utils/utils";
import BackBtn from "../pure/back-btn";

import "../../styles/style-edit-profile.css";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProfile } from "../../firebase/firebase-utils";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
	username: Yup.string()
		.min(10, "UserName es muy corto")
		.max(20, "UserName es muy largo"),
	email: Yup.string().email("Formato Invalido").required("Email es requerido"),
	photoURL: Yup.string().url("Formato Invalido"),
});

const EditProfile = () => {
	const { user } = useContext(AuthContext);
	const initValues = {
		username: `${user.displayName || getUserNameFromEmail(user.email)}`,
		email: `${user.email}`,
		photoURL: `${user.photoURL || ""}`,
	};

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
				<Formik
					initialValues={initValues}
					validationSchema={schema}
					onSubmit={async (values) => {
						await updateProfile({
							displayName: values.username,
							email: values.email,
							photoURL: values.photoURL,
						});
					}}
				>
					{({ touched, errors, isSubmitting }) => (
						<Form>
							<div className="container-inputs">
								<label htmlFor="username">UserName</label>
								<Field type="text" id="username" name="username" />
								{errors.username && touched.username && (
									<ErrorMessage name="username" component="div"></ErrorMessage>
								)}
							</div>
							<div className="container-inputs">
								<label htmlFor="email">Email</label>
								<Field type="email" id="email" name="email" />
								{errors.email && touched.email && (
									<ErrorMessage name="email" component="div"></ErrorMessage>
								)}
							</div>
							<div className="container-inputs">
								<label htmlFor="photoURL">Avatar URL</label>
								<Field type="url" id="photoURL" name="photoURL" />
								{errors.photoURL && touched.photoURL && (
									<ErrorMessage
										name="photoURL"
										component={"div"}
									></ErrorMessage>
								)}
							</div>
							<div className="container-buttons">
								<button className="button" type="submit">
									Save
								</button>
								<button className="button" type="button" onClick={cancel}>
									Cancel
								</button>
							</div>
							{isSubmitting ? <p>Sending...</p> : null}
						</Form>
					)}
				</Formik>
			</section>
		</div>
	);
};

export default EditProfile;
