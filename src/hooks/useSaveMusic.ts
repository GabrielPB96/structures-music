import { useContext, useEffect, useState } from "react";
import {
	readGetOnce,
	removeFileWithPath,
	updateDataPath,
} from "../firebase/firebase-realdatabase";
import AuthContext from "../context/AuthContext";
import MetronomeContext from "../context/MetronomeContext";
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

	const saveMusic = async () => {
		setGuardando(true);
		const data = await readGetOnce(pathFile);

		let father = pathFile.split("/");
		father = father.slice(0, father.length - 1);
		const pathFather = father.join("/");

		let newData = {
			...data,
			["_name"]: `${title}`,
			["_music"]: {
				...data._music,
				["_title"]: `${title}`,
				["_album"]: `${album}`,
				["_autor"]: `${autor}`,
				["_structure"]: `${estructura}`,
				["_metronome"]: {
					["bpm"]: stateMetronome.bpm,
					["compass"]: stateMetronome.compass,
					["statePoints"]: stateMetronome.statePoints,
				},
			},
			["_path"]: `${pathFather}/${title}`,
		};

		if (
			data._name !== title ||
			data._music._autor !== autor ||
			data._music._album !== album ||
			data._music._structure !== estructura ||
			data._music._metronome !== stateMetronome
		) {
			await updateDataPath(pathFile, newData);
		}
		if (data._name !== title) {
			const dataFather = await readGetOnce(pathFather);
			await updateDataPath(pathFather, {
				...dataFather,
				[`${title}`]: newData,
			});
			await removeFileWithPath(pathFile);
		}

		setGuardando(false);
	};

	return {
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
	};
}
