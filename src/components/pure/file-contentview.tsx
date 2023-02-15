import { File } from "../../models/structure-files/file.class";
import Metronome from "../metronome/components/container/metronome";
import { arrayStatesToArrayPoints } from "../metronome/utils/utils";

//styles
import "../../styles/style-files.css";
import "../../styles/style-file-music.css";
import BackBtn from "./back-btn";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import SaveBtn from "./save-btn";
import { db, updateDataPath } from "../../firebase/firebase-realdatabase";
import { onValue, ref } from "firebase/database";

/**
 * TODO: HACER LOS CAMPOS EDITABLES
 * TODO: AGREGAR BOTON PARA GUARDAR CAMBIOS
 * TODO: AGREGAR EDITOR DE TEXTO
 */

type Props = {
	props: File;
};
const FileContentView = ({ props }: Props) => {
	const { pathFile } = useContext(AuthContext);

	console.log(pathFile);
	const [title, setTitle] = useState(props._name);
	const [autor, setAutor] = useState(props._music._autor);
	const [album, setAlbum] = useState(props._music._album);
	const [compass, setCompass] = useState(props._music._metronome.compass);
	const [bpm, seBpm] = useState(props._music._metronome.bpm);
	const [estructura, setEstructura] = useState(`${props._music._structure}`);

	const saveInfo = async () => {
		const dataRef = ref(db, pathFile);
		onValue(dataRef, async (snapshot) => {
			const data = snapshot.val();
			let newData = {
				...data,
				["_name"]: `${title}`,
				["_music"]: {
					...data._music,
					["_title"]: `${title}`,
					["_album"]: `${album}`,
					["_autor"]: `${autor}`,
					["_structure"]: `${estructura}`,
				},
			};
			await updateDataPath(pathFile, newData);
			console.log("update");
		});
	};

	return (
		<div className="page-file-music">
			<header className="header-app page-file-music-header">
				<div className="container-title">
					<div className="back-button">
						<BackBtn />
					</div>

					<h1>
						<input
							className="input-title"
							type="text"
							name="title"
							id="title"
							value={title}
							onChange={(event) => {
								setTitle(event.target.value);
							}}
						/>
					</h1>
					<div className="save-button">
						<SaveBtn action={saveInfo} />
					</div>
				</div>

				<div className="page-file-music-info">
					<div className="page-file-music-date">
						<p>Fecha: {props._creationDate}</p>
					</div>
					<div className="page-file-music-autor">
						<label className="label-info" htmlFor="autor">
							<span> Autor: </span>
						</label>
						<input
							className="input-autor"
							type="text"
							name="autor"
							id="autor"
							value={autor}
							onChange={(event) => {
								setAutor(event.target.value);
							}}
						/>
					</div>
					<div className="page-file-music-album">
						<label className="label-info" htmlFor="album">
							<span> Album: </span>
						</label>
						<input
							className="input-album"
							type="text"
							name="album"
							id="album"
							value={album}
							onChange={(event) => {
								setAlbum(event.target.value);
							}}
						/>
					</div>
				</div>
			</header>
			<main className="page-file-music-main">
				<Metronome
					compassInit={props._music._metronome.compass}
					customMetronome={{
						bpm: props._music._metronome.bpm,
						compass: props._music._metronome.compass,
						statePoinst: arrayStatesToArrayPoints(
							props._music._metronome.statePoints
						),
					}}
				/>
				<section className="container-structure">
					<textarea
						className="textarea-structure"
						id="structure"
						value={estructura}
						defaultValue={estructura}
						onChange={(event) => {
							setEstructura(event.target.value);
						}}
					/>
				</section>
			</main>
		</div>
	);
};

export default FileContentView;
