import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../../styles/style-modal.css";

const folderSchema = Yup.object().shape({
	name: Yup.string()
		.required()
		.min(5, "Folder name too short")
		.max(50, "Folder name too long")
		.required("Folder name is required"),
});

type Props = {
	cancel: Function;
	action: Function;
};

const CreateFolder = ({ cancel, action }: Props) => {
	const initialValues = {
		name: "",
	};

	const hadleAction = async (name: string) => {
		return await action(name);
	};

	const hadleCancel = () => {
		cancel(false);
	};
	return (
		<div className="container-modal">
			<section className="container-form">
				<Formik
					initialValues={initialValues}
					validationSchema={folderSchema}
					onSubmit={async (values: any) => {
						try {
							await hadleAction(values.name);
						} catch (error) {}
					}}
				>
					{({ touched, errors, isSubmitting }) => (
						<Form>
							<div className="container-input-label">
								<div className="container-input-icon container-folder">
									<Field
										id="name"
										type="text"
										name="name"
										placeholder="New Folder"
									></Field>
								</div>
							</div>

							{errors.name && touched.name && (
								<ErrorMessage name="name" component="div"></ErrorMessage>
							)}
							<button type="submit">Create Folder</button>
							<button type="button" onClick={hadleCancel}>
								Cancel
							</button>
							{isSubmitting ? <p>Creating...</p> : null}
						</Form>
					)}
				</Formik>
			</section>
		</div>
	);
};

export default CreateFolder;
