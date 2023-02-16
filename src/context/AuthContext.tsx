import { createContext, useEffect, useState } from "react";
import { auth, stateChanged } from "../firebase/firebase-utils.js";

const AuthContext = createContext({
	user: {
		displayName: "",
		email: "",
		uid: "",
		photoURL: "",
	},
	pathFile: "",
	setPathFile: (newPath: string) => {},
});

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<any>(() => {
		const userLocalStorage = localStorage.getItem("user");
		if (userLocalStorage) return JSON.parse(userLocalStorage);
		return auth.currentUser;
	});
	const [pathFile, setPathFile] = useState(() => {
		const pathFileLocalStorage = localStorage.getItem("pathFile");
		if (pathFileLocalStorage) return pathFileLocalStorage;
		return "";
	});
	useEffect(() => {
		stateChanged(setUser, setPathFile);
	}, []);
	const data = { user, pathFile, setPathFile };
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
