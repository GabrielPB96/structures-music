import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { BuilderUser } from "../../../models/builder-user";

import { signUp, singUpGoogle, auth } from "../../../firebase/firebase-utils";
import { createUser as createU } from "../../../firebase/firebase-realdatabase";

import "../../../styles/style-login.css";

const registerSchema = Yup.object().shape({
	username: Yup.string()
		.min(6, "Username too short")
		.max(20, "Username too long")
		.required("Username is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password too short")
		.required("Password is required"),
	confirm: Yup.string()
		.when("password", {
			is: (value: string) => (value && value.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref("password")], "¡Passwords must match!"),
		})
		.required("You must confirm the password"),
});

const Register = () => {
	const user = new BuilderUser();
	const initialValues = {
		username: "",
		email: "",
		password: "",
		confirm: "", // to confirm password
	};
	return (
		<section className="container-form">
			<Formik
				initialValues={initialValues}
				// *** Yup Validation Schema ***
				validationSchema={registerSchema}
				// ** onSubmit Event
				onSubmit={async (values: any) => {
					try {
						await signUp(values.username, values.email, values.password);
						let uid = auth.currentUser?.uid;
						if (!uid) throw Error("No se puedo crear el usuario");
						//let newUser = new User(values.username, values.email, uid, {});
						//await createUser(values.username, PARSEOBJECT(newUser));
						await createU(uid, values.username, values.email);
					} catch (error: any) {
						alert(`Create User: ${error.code}`);
					}
				}}
			>
				{({
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
				}) => (
					<Form>
						<div className="container-input-label">
							<label htmlFor="username">UserName</label>
							<div className="container-input-icon container-user">
								<Field
									id="username"
									type="text"
									name="username"
									placeholder="username"
								/>
							</div>
						</div>
						{errors.username && touched.username && (
							<ErrorMessage name="username" component="div"></ErrorMessage>
						)}

						<div className="container-input-label">
							<label htmlFor="email">Email</label>
							<div className="container-input-icon container-email">
								<Field
									id="email"
									type="email"
									name="email"
									placeholder="example@email.com"
								/>
							</div>
						</div>

						{/* Email Errors */}
						{errors.email && touched.email && (
							<ErrorMessage name="email" component="div"></ErrorMessage>
						)}
						<div className="container-input-label">
							<label htmlFor="password">Password</label>
							<div className="container-input-icon container-password">
								<Field
									id="password"
									name="password"
									placeholder="password"
									type="password"
								/>
							</div>
						</div>
						{/* Password Errors */}
						{errors.password && touched.password && (
							<ErrorMessage name="password" component="div"></ErrorMessage>
						)}
						<div className="container-input-label">
							<label htmlFor="confirm">Password</label>
							<div className="container-input-icon container-password">
								<Field
									id="confirm"
									name="confirm"
									placeholder="confirm passsword"
									type="password"
								/>
							</div>{" "}
						</div>
						{/* Confirm Password Errors */}
						{errors.confirm && touched.confirm && (
							<ErrorMessage name="confirm" component="div"></ErrorMessage>
						)}

						<button type="submit">Register Account</button>
						<button type="button" onClick={singUpGoogle}>
							Google
						</button>
						{isSubmitting ? <p>Sending your credentials...</p> : null}
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default Register;
