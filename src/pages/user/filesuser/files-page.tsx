//styles
import "../../../styles/style-files.css";

//firebase
import { removeFileWithPath } from "../../../firebase/firebase-realdatabase";

//react
import { useContext, useEffect, useState } from "react";

//react router
import AuthContext from "../../../context/AuthContext";
import CreateFolder from "../../../components/pure/modal-create-folder";

import { createFolderWithPath, StateReadFile } from "../../../utils/utils";
import ConfirmModal from "../../../components/pure/confirm-modal";
import FileContentView from "../../../components/pure/file-contentview";
import { MetronomeProvider } from "../../../context/MetronomeContext";

import { useReadFile } from "../../../hooks/useReadFile";
import FolderPage from "../../../components/container/folder-page";

const FilesPage = () => {
	const { pathFile } = useContext(AuthContext);
	const { directory, search, resetDirectory } = useReadFile();

	const [modalCreate, setModalCreate] = useState<boolean>(false);
	const [modalConfirmRemove, setModalConfirmRemove] = useState<boolean>(false);
	const [currentPath, setCurrentPath] = useState<string>("");

	const createFolder = async (nameFolder: string) => {
		try {
			await createFolderWithPath(nameFolder, `${pathFile}`);
			setModalCreate(false);
		} catch (error) {
			console.error("error al crear folder");
		}
	};

	const handleRemove = async (absolutePath: string) => {
		setCurrentPath(absolutePath);
		setModalConfirmRemove(true);
	};

	const removeFile = async () => {
		await removeFileWithPath(currentPath);
		setModalConfirmRemove(false);
	};

	return (
		<>
			{directory.state !== StateReadFile.FILE ? (
				<FolderPage
					directory={directory}
					search={search}
					handleRemove={handleRemove}
					setModalCreate={setModalCreate}
					resetDirectory={resetDirectory}
				/>
			) : (
				<MetronomeProvider>
					<FileContentView props={directory.content} />
				</MetronomeProvider>
			)}

			{modalCreate && (
				<CreateFolder action={createFolder} cancel={setModalCreate} />
			)}
			{modalConfirmRemove && (
				<ConfirmModal
					message="¿Estas seguro?"
					accept={removeFile}
					cancel={() => setModalConfirmRemove(false)}
				/>
			)}
		</>
	);
};

export default FilesPage;
