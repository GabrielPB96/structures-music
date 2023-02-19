import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { off, onValue, ref } from "firebase/database";
import {
	StateRead,
	StateReadFile,
	objectToArray,
	searchFile,
} from "../utils/utils";
import { db } from "../firebase/firebase-realdatabase";

export function useReadFile() {
	const { user, pathFile } = useContext(AuthContext);
	const [directory, setDirectory] = useState<StateRead>({
		state: StateReadFile.LOADING,
		content: null,
	});

	const refDir = useRef<any>();

	const directoryStorage = useRef<any>(null);

	const callBackOnValue = useCallback((snapshot: any) => {
		try {
			const data = snapshot.val();
			let list = data._children && objectToArray(data._children);
			let newStateContent: StateRead = {
				state: StateReadFile.EMPTY,
				content: null,
			};
			if (list) {
				directoryStorage.current = [...list];
				newStateContent = {
					state: StateReadFile.FOLDER,
					content: [...list],
				};
			} else {
				if (data._type === "file") {
					newStateContent = {
						state: StateReadFile.FILE,
						content: { ...data },
					};
					off(refDir.current, "value", callBackOnValue);
				}
			}
			setDirectory(newStateContent);
		} catch (error) {
			console.log("error : Read folder");
		}
	}, []);

	useEffect(() => {
		const refDirectory = ref(db, pathFile);
		refDir.current = refDirectory;

		if (user) {
			onValue(refDirectory, callBackOnValue);
		}

		return () => {
			off(refDirectory, "value", callBackOnValue);
		};
	}, [pathFile]);

	const search = (nameFile: string) => {
		const nameValid = nameFile.trim();
		if (nameValid.length) {
			const filesFound = searchFile(directory.content, nameValid);
			let stateResponse: StateRead = {
				state: directory.state,
				content: [...filesFound],
			};
			if (!filesFound.length) {
				stateResponse = {
					state: StateReadFile.SEARCH_EMPTY,
					content: null,
				};
			}
			setDirectory(stateResponse);
		}
	};

	const resetDirectory = () => {
		if (directoryStorage.current) {
			setDirectory({
				state: directory.state,
				content: [...directoryStorage.current],
			});
		} else {
			setDirectory({
				state: StateReadFile.EMPTY,
				content: null,
			});
		}
	};

	return { directory, search, resetDirectory };
}
