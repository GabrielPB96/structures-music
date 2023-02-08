import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signIn, auth, singUpGoogle } from "../../../firebase/firebase-utils";

import "../../../styles/style-login.css";

import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Login = () => {
	const initialCredentials = {
		email: "",
		password: "",
	};
	const navigate = useNavigate();
	return (
		<section className="container-form">
			<Formik
				// *** Initial values that the form will take
				initialValues={initialCredentials}
				// *** Yup Validation Schema ***
				validationSchema={loginSchema}
				// ** onSubmit Event
				onSubmit={async (values, { resetForm }) => {
					try {
						await signIn(values.email, values.password).then((e) => {
							navigate("/dashboard");
							resetForm();
						});
					} catch (error: any) {
						alert(error.code);
					}
				}}
			>
				{/* We obtain props from Formik */}

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
						<button type="submit">Login</button>
						<button type="button" onClick={singUpGoogle}>
							Google
						</button>
						{isSubmitting ? <p>Login your credentials...</p> : null}
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default Login;
