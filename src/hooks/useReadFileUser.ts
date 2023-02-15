import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { off, onValue, ref } from "firebase/database";
import { StateRead, StateReadFile, objectToArray } from "../utils/utils";
import { db, readGetOnce } from "../firebase/firebase-realdatabase";

export function useReadFileUser() {
	const { pathFile } = useContext(AuthContext);
	const [directory, setDirectory] = useState<StateRead>({
		state: StateReadFile.LOADING,
		content: null,
	});

	useEffect(() => {
		const refDirectory = ref(db, pathFile);
		const callBackOnValue = (snapshot: any) => {
			try {
				const data = snapshot.val();
				let list = data._children && objectToArray(data._children);
				if (list) {
					setDirectory({
						state: StateReadFile.FOLDER,
						content: list,
					});
				} else {
					setDirectory({
						state: StateReadFile.EMPTY,
						content: null,
					});
				}
			} catch (error) {
				console.log("error : Read folder");
			}
		};
		readGetOnce(pathFile).then((dataPath) => {
			if (dataPath._type === "folder") {
				//establecer el escucha
				onValue(refDirectory, callBackOnValue);
			} else {
				setDirectory({
					state: StateReadFile.FILE,
					content: dataPath,
				});
			}
		});
		return () => {
			off(refDirectory, "value", callBackOnValue);
		};
	}, [pathFile]);

	return { directory };
}
