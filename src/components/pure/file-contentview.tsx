import { File } from "../../models/structure-files/file.class";
import Metronome from "../metronome/components/container/metronome";
import { arrayStatesToArrayPoints } from "../metronome/utils/utils";

//styles
import "../../styles/style-files.css";
import "../../styles/style-file-music.css";
import BackBtn from "./back-btn";
import { useState } from "react";

/**
 * TODO: HACER LOS CAMPOS EDITABLES
 * TODO: AGREGAR BOTON PARA GUARDAR CAMBIOS
 * TODO: AGREGAR EDITOR DE TEXTO
 */

type Props = {
	props: File;
};
const FileContentView = ({ props }: Props) => {
	const [estructura, setEstructura] = useState(`${props._music._estructure}`);
	return (
		<div className="page-file-music">
			<header className="header-app page-file-music-header">
				<div className="container-title">
					<div className="back-button">
						<BackBtn />
					</div>

					<h1>{props._music._title}</h1>
					<div className="save-button">
						<BackBtn />
					</div>
				</div>

				<div className="page-file-music-info">
					<div className="page-file-music-date">
						<p>Fecha: {props._creationDate}</p>
					</div>
					<div className="page-file-music-autor">
						<p>Autor: {props._music._autor}</p>
					</div>
					<div className="page-file-music-album">
						<p>Album: {props._music._album}</p>
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
