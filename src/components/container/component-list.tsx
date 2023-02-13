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
	actionRemove: Function;
};
const ComponentList = ({
	type,
	title,
	textPreview,
	createDate,
	pathFile,
	actionRemove,
}: Props) => {
	let component: any;
	let paths =
		type === TypeArchive.FILE ? iconsPaths.fileMusic : iconsPaths.folderMusic;
	component = (
		<FilePreview
			title={title}
			textPreview={textPreview || null}
			createDate={createDate}
			pathsIcons={paths}
			pathFile={pathFile}
			actionRemove={actionRemove}
		/>
	);
	return component;
};

export default ComponentList;
