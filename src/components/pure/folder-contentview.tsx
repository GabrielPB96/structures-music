import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
	db,
	onReadDataUserWithPath,
} from "../../firebase/firebase-realdatabase";
import { onValue, ref, set } from "firebase/database";
import {
	Array,
	arrayComponentList,
	objectToArray,
	objetoFolderToFolder,
} from "../../utils/utils";
import Loading from "./loading";
import MenuBar from "./menubar";
import CreateFolder from "./modal-create-folder";
import { Folder } from "../../models/structure-files/folder.class";

const FolderContentView = () => {
	let location = useLocation();
	let p = location.pathname.split("/");
	p.shift();
	p.shift();
	let path = p.join("/");
	console.log(path);

	// const { path } = useParams();
	const { user } = useContext(AuthContext);
	/**
	 * [] -> tipo de dato requerido
	 * null -> se esta cargando el directorio
	 * false -> no existe directory
	 */
	const [folder, setFolder] = useState<Array[] | null | false>(null);
	const [modalCreate, setModalCreate] = useState<boolean>(false);
	useEffect(() => {
		if (user) {
			const refDirectory = ref(
				db,
				`users/${user.uid}/directory/${path}/_children`
			);
			onValue(refDirectory, (snapshot) => {
				const data = snapshot.val();
				console.log(data);
				let list = objectToArray(data);
				console.log(list);
				if (list) setFolder(list);
				else setFolder(false);
			});
		}
	}, []);
	const createFolder = async (nameFolder: string) => {
		let fold: any = await onReadDataUserWithPath(
			`${user?.uid}/directory/${path}`
		);
		const directory = objetoFolderToFolder(fold);
		let childFold1 = new Folder(
			nameFolder,
			`${user?.uid}/directory/${path}/${nameFolder}`
		);
		directory.add(childFold1);
		await set(
			//TODO:revisar si abstraer la parte de "users/"
			ref(db, `users/${user?.uid}/directory/${path}`),
			JSON.parse(JSON.stringify(directory))
		);
		setModalCreate(false);
	};
	return (
		<div className="page">
			<header>
				<h1>Carpeta: {path && path.split("/").pop()}</h1>
			</header>

			<MenuBar newFolder={setModalCreate} />
			<main className="main-app">
				{folder ? (
					// TODO: reemplazar la funcion de arrayComponentList
					arrayComponentList(folder, () => {})
				) : folder === false ? (
					<p>Empty</p>
				) : (
					<Loading />
				)}
			</main>
			{modalCreate && (
				//TODO: reemplazar action
				<CreateFolder action={createFolder} cancel={setModalCreate} />
			)}
		</div>
	);
};

export default FolderContentView;
