//import Metronome from "./components/metronome/components/container/metronome";
import MenuBar from "../../../components/pure/menubar";

//styles
import "../../../styles/style-files.css";

//firebase
//import { readDoc, readExactProperty } from "../../../firebase/firebase-utils";
import {
	db,
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
	Array,
	lastFileFromUrl,
} from "../../../utils/utils";
import ConfirmModal from "../../../components/pure/confirm-modal";

const FilesPage = () => {
	const { user, pathFile } = useContext(AuthContext);
	/**
	 * [] -> tipo de dato requerido
	 * null -> se esta cargando el directorio
	 * false -> no existe directory
	 */
	const [directory, setDirectory] = useState<Array[] | null | false>(null);
	const [modalCreate, setModalCreate] = useState<boolean>(false);
	const [modalConfirmRemove, setModalConfirmRemove] = useState<boolean>(false);
	const [currentPath, setCurrentPath] = useState<string>("");

	useEffect(() => {
		const callBackOnValue = (snapshot: any) => {
			try {
				const data = snapshot.val();
				let list = data._children && objectToArray(data._children);
				if (list) setDirectory(list);
				else setDirectory(false);
			} catch (error) {
				console.log("error : Read folder");
			}
		};
		const refDirectory = ref(db, pathFile);
		if (user) {
			onValue(refDirectory, callBackOnValue);
		}
		return () => {
			off(refDirectory, "value", callBackOnValue);
		};
	}, [pathFile]);

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
		<div className="page">
			<header className="header-app header-files">
				<h1>{lastFileFromUrl(pathFile)}</h1>
			</header>

			<MenuBar
				newFolder={setModalCreate}
				currentFolder={directory}
			/>

			<main className="main-app main-files-user">
				{directory ? (
					arrayComponentList(directory, hadleRemove)
				) : directory === false ? (
					<p>Empty</p>
				) : (
					<Loading />
				)}
			</main>
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
		</div>
	);
};

export default FilesPage;
