import { createContext, useEffect, useState } from "react";
import { auth, stateChanged } from "../firebase/firebase-utils.js";

const AuthContext = createContext({
	user: {
		displayName: "",
		email: "",
		uid: "",
	},
	pathFile: "",
	setPathFile: (newPath: string) => {},
});

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<any>(auth.currentUser);
	const [pathFile, setPathFile] = useState("");
	useEffect(() => {
		stateChanged(setUser, setPathFile);
	}, []);
	const data = { user, pathFile, setPathFile };
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
