//components
import FilePreview from "../pure/file-preview";

//models
import { TypeArchive } from "../../models/type-archive.enum";
import { iconsPaths } from "../../utils/icons";

type Props = {
	type: string;
	title: string;
	textPreview?: string | null;
	createDate: string;
	pathFile: string;
};
const ComponentList = ({
	type,
	title,
	textPreview,
	createDate,
	pathFile,
}: Props) => {
	let component: any;
	let paths =
		type === TypeArchive.FILE ? iconsPaths.fileMusic : iconsPaths.folderMusic;
	component = (
		<FilePreview
			title={title}
			textPreview={textPreview || null}
			createDate={createDate}
			paths={paths}
			pathFile={pathFile}
		/>
	);
	return component;
};

export default ComponentList;
