//components
import FilePreview from "../pure/file-preview";
import FolderPreview from "../pure/folder-preview";

//models
import { TypeArchive } from "../../models/type-archive.enum";

type Props = {
	type: string;
	title: string;
	textPreview?: string;
	createDate: string;
};
const ComponentList = ({ type, title, textPreview, createDate }: Props) => {
	let component: any;
	if (type === TypeArchive.FILE) {
		component = (
			<FilePreview
				title={title}
				textPreview={textPreview || ""}
				createDate={createDate}
			/>
		);
	} else {
		component = <FolderPreview title={title} createDate={createDate} />;
	}
	return component;
};

export default ComponentList;
