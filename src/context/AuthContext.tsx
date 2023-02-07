import { createContext, useEffect, useState } from "react";
import { auth, stateChanged } from "../firebase/firebase-utils.js";

const AuthContext = createContext({ user: auth.currentUser });

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState(auth.currentUser);
	useEffect(() => {
		stateChanged(setUser);
	}, []);
	const data = { user };
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
