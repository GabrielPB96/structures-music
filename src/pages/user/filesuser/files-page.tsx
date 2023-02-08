import ComponentList from "../../../components/container/component-list";
//import Metronome from "./components/metronome/components/container/metronome";
import MenuBar from "../../../components/pure/menubar";

//styles
import "../../../styles/style-files.css";

//firebase
//import { readDoc, readExactProperty } from "../../../firebase/firebase-utils";
import {
	addFile,
	db,
	readDataUser,
} from "../../../firebase/firebase-realdatabase";
//react
import { useContext, useEffect, useState } from "react";

//react router
import AuthContext from "../../../context/AuthContext";
import { onValue, ref, set } from "firebase/database";
import CreateFolder from "../../../components/pure/modal-create-folder";
import { Folder } from "../../../models/structure-files/folder.class";

interface TypeDirectory {
	[key: string]: any;
}
const FilesPage = () => {
	//const us = useLoaderData();
	//console.log(us);

	const { user } = useContext(AuthContext);
	const [directory, setDirectory] = useState<TypeDirectory | null>({});
	const [modal, setModal] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			const refDirectory = ref(db, `users/${user.uid}/directory`);
			onValue(refDirectory, (snapshot) => {
				const data = snapshot.val();
				setDirectory(data);
			});
		}
	}, []);

	const renderList = () => {
		let list: any = [];
		for (let ob in directory) {
			list.push(directory[ob]);
		}

		return list.length ? list : null;
	};
	const renderFiles = () => {
		let list = renderList();
		let res = null;
		if (list) {
			res = renderList().map((e: any, k: number) => (
				<ComponentList
					type={e._type}
					title={e._name}
					textPreview={e._textPreview}
					createDate={e._creationDate}
					key={`clp${k}`}
					pathFile={e._path}
				/>
			));
		}
		return res;
	};

	const createFolder = async (nameFolder: string) => {
		let path: string = `users/${user?.uid}/directory/${nameFolder}`;
		let folder: Folder = new Folder(nameFolder, path);
		//set(ref(db, `${PATH_USERS}${idUser}`), ob)
		return set(ref(db, path), folder).then((e) => {
			setModal(false);
		});
	};

	return (
		<div className="page">
			<header className="header-app header-files">
				<h1>Music Structures</h1>
			</header>

			<MenuBar newFolder={setModal} />

			<main className="main-app main-files-user">
				{renderFiles() ? renderFiles() : "Cargando..."}
			</main>
			{modal && <CreateFolder action={createFolder} cancel={setModal} />}
		</div>
	);
};

export default FilesPage;
