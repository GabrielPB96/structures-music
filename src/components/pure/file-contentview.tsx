import { File } from "../../models/structure-files/file.class";
import Metronome from "../metronome/components/container/metronome";
import { arrayStatesToArrayPoints } from "../metronome/utils/utils";

//styles
import "../../styles/style-files.css";
import BackBtn from "./back-btn";

/**
 * TODO: HACER LOS CAMPOS EDITABLES
 * TODO: AGREGAR BOTON PARA GUARDAR CAMBIOS
 * TODO: AGREGAR EDITOR DE TEXTO 
 */

type Props = {
	props: File;
};
const FileContentView = ({ props }: Props) => {
	console.log(props._music);
	return (
    <div className="page" style={{
      gridTemplateRows:"20% 1fr"
    }}>
			<header className="header-app header-files">
				<h1>{props._music._title}</h1>
				<p>Fecha: {props._creationDate}</p>
        <p>Autor: {props._music._autor}</p>
        <BackBtn />
			</header>
			<main className="main-app main-files-user">
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
			</main>
		</div>
	);
};

export default FileContentView;
