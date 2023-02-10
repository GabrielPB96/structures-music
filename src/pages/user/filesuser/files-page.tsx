import ComponentList from "../../../components/container/component-list";
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
import { onValue, ref } from "firebase/database";
import CreateFolder from "../../../components/pure/modal-create-folder";
import Loading from "../../../components/pure/loading";

import {
	objectToArray,
	arrayComponentList,
	createFolderWithPath,
	Array,
} from "../../../utils/utils";
import ConfirmModal from "../../../components/pure/confirm-modal";

const FilesPage = () => {
	const { user } = useContext(AuthContext);
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
		if (user) {
			const refDirectory = ref(db, `users/${user.uid}/directory`);
			onValue(refDirectory, (snapshot) => {
				const data = snapshot.val();
				let list = objectToArray(data);
				if (list) setDirectory(list);
				else setDirectory(false);
			});
		}
	}, []);

	const createFolder = async (nameFolder: string) => {
		try {
			let absolutePath: string = `users/${user?.uid}/directory/${nameFolder}`;
			await createFolderWithPath(nameFolder, absolutePath);
			setModalCreate(false);
		} catch (error) {
			console.error(error);
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
				<h1>Music Structures</h1>
			</header>

			<MenuBar newFolder={setModalCreate} />

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
