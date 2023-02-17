import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { off, onValue, ref } from "firebase/database";
import {
	StateRead,
	StateReadFile,
	objectToArray,
	searchFile,
} from "../utils/utils";
import { db, readGetOnce } from "../firebase/firebase-realdatabase";

export function useReadFileUser() {
	const { pathFile } = useContext(AuthContext);
	const [directory, setDirectory] = useState<StateRead>({
		state: StateReadFile.LOADING,
		content: null,
	});

	const directoryStorage = useRef(null);

	const callBackOnValue = useCallback((snapshot: any) => {
		try {
			const data = snapshot.val();
			let list = data._children && objectToArray(data._children);
			if (!directoryStorage.current) directoryStorage.current = list;
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
	}, []);

	useEffect(() => {
		const refDirectory = ref(db, pathFile);
		try {
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
		} catch (error) {
			console.log("error : Read file");
		}

		return () => {
			off(refDirectory, "value", callBackOnValue);
		};
	}, [pathFile]);

	const search = (nameFile: string) => {
		if (nameFile.length) {
			const filesFound = searchFile(directory.content, nameFile);
			setDirectory({
				state: directory.state,
				content: filesFound,
			});
		}
	};

	const resetDirectory = () => {
		setDirectory({
			state: directory.state,
			content: directoryStorage.current,
		});
	};

	return { directory, search, resetDirectory };
}
