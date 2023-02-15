//import Metronome from "./components/metronome/components/container/metronome";
import MenuBar from "../../../components/pure/menubar";

//styles
import "../../../styles/style-files.css";

//firebase
//import { readDoc, readExactProperty } from "../../../firebase/firebase-utils";
import {
	db,
	readGetOnce,
	removeFileWithPath,
} from "../../../firebase/firebase-realdatabase";
//react
import { useContext, useEffect, useState } from "react";

//react router
import AuthContext from "../../../context/AuthContext";
import { off, onValue, ref } from "firebase/database";
import CreateFolder from "../../../components/pure/modal-create-folder";
import Loading from "../../../components/pure/loading";

import {
	objectToArray,
	arrayComponentList,
	createFolderWithPath,
	lastFileFromUrl,
	StateReadFile,
	StateRead,
} from "../../../utils/utils";
import ConfirmModal from "../../../components/pure/confirm-modal";
import FileContentView from "../../../components/pure/file-contentview";
import { useReadFileUser } from "../../../hooks/useReadFileUser";

const Header = ({ title }: { title: string }) => {
	return (
		<header className="header-app header-files">
			<h1>{title}</h1>
		</header>
	);
};

const FilesPage = () => {
	const { pathFile } = useContext(AuthContext);
	const { directory } = useReadFileUser();

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

	const hadleRemove = async (absolutePath: string) => {
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
				<div className="page">
					<Header title={lastFileFromUrl(pathFile) || ""} />

					<MenuBar
						newFolder={setModalCreate}
						currentFolder={directory.content}
					/>
					<main className="main-app main-files-user">
						{directory.state === StateReadFile.LOADING ? (
							<Loading />
						) : directory.state === StateReadFile.FOLDER ? (
							arrayComponentList(directory.content || [], hadleRemove)
						) : (
							<p>Empty</p>
						)}
					</main>
				</div>
			) : (
				//TODO: REVISAR EL TIPADO :(
				<FileContentView props={directory.content} />
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
