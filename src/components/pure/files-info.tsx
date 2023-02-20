import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { readGetOnce } from "../../firebase/firebase-realdatabase";

import "../../styles/style-files-info.css";
import Icon from "./icon";
import { iconsPaths } from "../../utils/icons";
import { objetoFolderToFolder } from "../../utils/utils";

const FilesInfo = () => {
	const { pathFile } = useContext(AuthContext);
	const [cantFiles, setCantFiles] = useState(0);
	const [cantFolders, setCantFolders] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		readGetOnce(pathFile).then((dataPath) => {
			const directory = objetoFolderToFolder(dataPath);
			const countFiles = directory.size();
			const countFolders = directory.countFolders();
			setCantFiles(countFiles);
			setCantFolders(countFolders);
			setTotal(countFiles + countFolders);
		});
	}, []);

	return (
		<section className="files-info">
			<div className="container-items">
				<div className="files-info-header">
					<h2>Files</h2>
				</div>
				<div className="files-info-total">
					<h3>Total: {total}</h3>
				</div>
				<article className="info-items">
					<div>
						<Icon paths={iconsPaths.fileMusic} width={16} height={16} />
					</div>
					<h3>Files: {cantFiles}</h3>
				</article>
				<article className="info-items">
					<div>
						<Icon paths={iconsPaths.folderMusic} width={16} height={16} />
					</div>
					<h3>Folders: {cantFolders}</h3>
				</article>
			</div>
		</section>
	);
};

export default FilesInfo;
