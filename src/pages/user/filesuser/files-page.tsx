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
import { File } from "../../../models/structure-files/file.class";
import { onValue, ref } from "firebase/database";
import CreateFolder from "../../../components/pure/modal-create-folder";

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
				/>
			));
		}
		return res;
	};

	const update = () => {
		let f = JSON.parse(JSON.stringify(new File("Nuevo")));
		addFile(f, `${user?.uid}/directory/Nuevo`);
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
			<button type="button" onClick={update}>
				Update
			</button>
			{modal && <CreateFolder action={() => {}} cancel={setModal} />}
		</div>
	);
};

export default FilesPage;
