import { File } from "../../models/structure-files/file.class";
import Metronome from "../metronome/components/container/metronome";
import { arrayStatesToArrayPoints } from "../metronome/utils/utils";

//styles
import "../../styles/style-files.css";
import "../../styles/style-file-music.css";

import BackBtn from "./back-btn";
import SaveBtn from "./save-btn";
import Loading from "./loading";

import { useSaveMusic } from "../../hooks/useSaveMusic";

type Props = {
	props: File | any;
};
const FileContentView = ({ props }: Props) => {
	const {
		saveMusic,
		title,
		autor,
		estructura,
		album,
		guardando,
		setAutor,
		setAlbum,
		setEstructura,
		setTitle,
	} = useSaveMusic({ props });

	return (
		<div className="page-file-music">
			<header className="header-app page-file-music-header">
				<div className="container-title">
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
					<div className="back-button">
						<BackBtn />
					</div>
					<div className={`save-button`}>
						<SaveBtn action={saveMusic}>save</SaveBtn>
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
						onChange={(event) => {
							setEstructura(event.target.value);
						}}
					/>
				</section>
			</main>
			{guardando && <Loading />}
		</div>
	);
};

export default FileContentView;
