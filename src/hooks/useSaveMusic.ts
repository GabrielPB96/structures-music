import { useCallback, useContext, useEffect, useState } from "react";
import {
	readGetOnce,
	removeFileWithPath,
	updateDataPath,
} from "../firebase/firebase-realdatabase";
import AuthContext from "../context/AuthContext";
import MetronomeContext, { StateMetronome } from "../context/MetronomeContext";
type Props = {
	props: File | any;
};
export function useSaveMusic({ props }: Props) {
	const [guardando, setGuardando] = useState(false);
	const { pathFile } = useContext(AuthContext);
	const { stateMetronome, setStateMetronome } = useContext(MetronomeContext);

	const [title, setTitle] = useState(props._name);
	const [autor, setAutor] = useState(props._music._autor);
	const [album, setAlbum] = useState(props._music._album);
	const [estructura, setEstructura] = useState(`${props._music._structure}`);

	useEffect(() => {
		const initState = {
			...stateMetronome,
			bpm: props._music._metronome.bpm,
			compass: props._music._metronome.compass,
			statePoints: props._music._metronome.statePoints,
		};
		setStateMetronome(initState);
	}, []);

	const saveMusic = useCallback(
		async ({
			title,
			autor,
			album,
			stateMetronome,
			estructura,
		}: {
			title: string;
			autor: string;
			album: string;
			stateMetronome: StateMetronome;
			estructura: string;
		}) => {
			setGuardando(true);
			const data = await readGetOnce(pathFile);

			let father = pathFile.split("/");
			father = father.slice(0, father.length - 1);
			const pathFather = father.join("/");

			let newData = {
				...data,
				["_name"]: `${title.trim()}`,
				["_music"]: {
					...data._music,
					["_title"]: `${title.trim()}`,
					["_album"]: `${album.trim()}`,
					["_autor"]: `${autor.trim()}`,
					["_structure"]: `${estructura.trim()}`,
					["_metronome"]: {
						["bpm"]: stateMetronome.bpm,
						["compass"]: stateMetronome.compass,
						["statePoints"]: stateMetronome.statePoints,
					},
				},
				["_path"]: `${pathFather}/${title.trim()}`,
			};

			if (
				data._name !== title.trim() ||
				data._music._autor !== autor.trim() ||
				data._music._album !== album.trim() ||
				data._music._structure !== estructura.trim() ||
				JSON.stringify(data._music._metronome) !==
					JSON.stringify(stateMetronome)
			) {
				await updateDataPath(pathFile, newData);
			}
			if (data._name !== title.trim()) {
				const dataFather = await readGetOnce(pathFather);
				await updateDataPath(pathFather, {
					...dataFather,
					[`${title.trim()}`]: newData,
				});
				await removeFileWithPath(pathFile);
			}

			setGuardando(false);
		},
		[]
	);

	return {
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
	};
}
