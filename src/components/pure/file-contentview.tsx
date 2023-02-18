import { File } from "../../models/structure-files/file.class";
import Metronome from "../metronome/components/container/metronome";
import { arrayStatesToArrayPoints } from "../metronome/utils/utils";

//styles
import "../../styles/style-files.css";
import "../../styles/style-file-music.css";

import BackBtn from "./back-btn";
import SaveBtn from "./save-btn";
import Loading from "./loading";
import Icon from "../pure/icon";

import { useSaveMusic } from "../../hooks/useSaveMusic";
import { iconsPaths } from "../../utils/icons";
import { useState } from "react";

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
		stateMetronome,
		setAutor,
		setAlbum,
		setEstructura,
		setTitle,
	} = useSaveMusic({ props });

	const [readOnly, setReadOnly] = useState(false);

	const hadleSave = () => {
		saveMusic({ title, autor, album, stateMetronome, estructura });
	};

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
						<SaveBtn action={hadleSave}>save</SaveBtn>
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
					<div className="container-structure-info">
						<p>Structure</p>
						<button
							className="button"
							id="button-lock"
							onClick={() => {
								setReadOnly(!readOnly);
							}}
						>
							{readOnly ? (
								<Icon paths={iconsPaths.lockFill} width={16} height={16} />
							) : (
								<Icon paths={iconsPaths.unlockFill} width={16} height={16} />
							)}
						</button>
					</div>
					<textarea
						className="textarea-structure"
						id="structure"
						value={estructura}
						onChange={(event) => {
							setEstructura(event.target.value);
						}}
						readOnly={readOnly}
					/>
				</section>
			</main>
			{guardando && <Loading />}
		</div>
	);
};

export default FileContentView;
