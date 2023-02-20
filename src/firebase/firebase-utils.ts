// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile as updateP,
} from "firebase/auth";

import { getEmailNormalize } from "../utils/utils";

const firebaseConfig = {
	apiKey: "AIzaSyA4rRcYWm6OG7uoZVX6LB6Y8LKmr3Yo6S4",
	authDomain: "music-structures.firebaseapp.com",
	databaseURL: "https://music-structures-default-rtdb.firebaseio.com",
	projectId: "music-structures",
	storageBucket: "music-structures.appspot.com",
	messagingSenderId: "207761468662",
	appId: "1:207761468662:web:69a6a040a13e486c6f50d7",
	measurementId: "G-58S86KLYQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const getCurrentAuth = () => {
	return new Promise((solve) => {
		const currentAuth = getAuth(app);
		solve(currentAuth);
	});
};

export const stateChanged = (setUser: any, setPathFile: any) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);
			const userLocalStore = localStorage.getItem("user");
			if (!userLocalStore) {
				localStorage.setItem(
					"user",
					JSON.stringify({
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						uid: user.uid,
					})
					);
				}
				const pathLocalStorage = localStorage.getItem("pathFile");
				if (!pathLocalStorage) {
					localStorage.setItem("pathFile", `users/${user.uid}/directory`);
					setPathFile(`users/${user.uid}/directory`);
			}
			//console.log("sing in");
		} else {
			setUser(null);
			setPathFile("");
			localStorage.removeItem("user");
			localStorage.removeItem("pathFile");
			//console.log("logout");
		}
	});
};

export const signUpUserPassword = async (
	username: string,
	password: string
) => {
	const email = getEmailNormalize(username);
	await createUserWithEmailAndPassword(auth, email, password);
	let user: any = auth.currentUser;
	await updateP(user, {
		displayName: username,
	});
};

export const signUp = async (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
	return signOut(auth);
};

type UserUpdate = {
	displayName?: string;
	email?: string;
	photoURL?: string;
};
export const updateProfile = async (userData: UserUpdate) => {
	let user: any = auth.currentUser;
	return updateP(user, userData);
};
