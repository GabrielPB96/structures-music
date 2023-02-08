import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../../styles/style-modal.css";
import Icon from "./icon";
import { iconsPaths } from "../../utils/icons";

const folderSchema = Yup.object().shape({
	name: Yup.string()
		.required()
		.min(6, "Folder name too short")
		.max(20, "Folder name too long")
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

	const hadleAction = () => {};

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
						console.log(values);
					}}
				>
					{({ touched, errors, isSubmitting }) => (
						<Form>
							<div className="container-input-label">
								<div className="container-input-icon">
									<Field
										id="name"
										type="text"
										name="name"
										placeholder="New Folder"
									></Field>
									<span className="span-icon-form">
										<Icon height={17} width={17} paths={iconsPaths.newFolder} />
									</span>
								</div>
							</div>

							{errors.name && touched.name && (
								<ErrorMessage name="name" component="div"></ErrorMessage>
							)}
							<button type="submit" onClick={hadleAction}>
								Create Folder
							</button>
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
