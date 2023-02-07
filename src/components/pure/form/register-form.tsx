import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { BuilderUser } from "../../../models/builder-user";

import { signUp, singUpGoogle } from "../../../firebase/firebase-utils";

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
					} catch (error: any) {
						alert(error.code);
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
							<div className="container-input-icon">
								<Field
									id="username"
									type="text"
									name="username"
									placeholder="username"
								/>
								<span className="span-icon-form"></span>
							</div>
						</div>
						{errors.username && touched.username && (
							<ErrorMessage name="username" component="div"></ErrorMessage>
						)}

						<div className="container-input-label">
							<label htmlFor="email">Email</label>
							<div className="container-input-icon">
								<Field
									id="email"
									type="email"
									name="email"
									placeholder="example@email.com"
								/>
								<span className="span-icon-form">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
										<path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
									</svg>
								</span>
							</div>
						</div>

						{/* Email Errors */}
						{errors.email && touched.email && (
							<ErrorMessage name="email" component="div"></ErrorMessage>
						)}
						<div className="container-input-label">
							<label htmlFor="password">Password</label>
							<div className="container-input-icon">
								<Field
									id="password"
									name="password"
									placeholder="password"
									type="password"
								/>
								<span className="span-icon-form">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
									</svg>
								</span>
							</div>
						</div>
						{/* Password Errors */}
						{errors.password && touched.password && (
							<ErrorMessage name="password" component="div"></ErrorMessage>
						)}
						<div className="container-input-label">
							<label htmlFor="confirm">Password</label>
							<div className="container-input-icon">
								<Field
									id="confirm"
									name="confirm"
									placeholder="confirm passsword"
									type="password"
								/>
								<span className="span-icon-form">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
									</svg>
								</span>
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
