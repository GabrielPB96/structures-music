// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getDatabase,
	ref,
	set,
	remove,
	get,
	child,
} from "firebase/database";
import { File } from "../models/structure-files/file.class";

import { Folder } from "../models/structure-files/folder.class";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA4rRcYWm6OG7uoZVX6LB6Y8LKmr3Yo6S4",
	authDomain: "music-structures.firebaseapp.com",
	projectId: "music-structures",
	storageBucket: "music-structures.appspot.com",
	messagingSenderId: "207761468662",
	appId: "1:207761468662:web:69a6a040a13e486c6f50d7",
	measurementId: "G-58S86KLYQW",
	databaseURL: "https://music-structures-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
const PATH_USERS = "/users/";

export async function s(ob: any, idUser: string) {
	return set(ref(db, `${PATH_USERS}${idUser}`), ob);
}

export const updateDataPath = async (path: string, data: any) => {
	return set(ref(db, path), data);
};

export async function createUser(uid: string, email: string) {
	const newRef = ref(db, `${PATH_USERS}${uid}`);
	let default_file: File = new File(
		"File",
		`${PATH_USERS}${uid}/directory/_children/File`
	);
	const directory: Folder = new Folder(
		"directory",
		`${PATH_USERS}${uid}/directory`
	);
	directory.add(default_file);
	return set(newRef, {
		uid,
		email,
		directory: JSON.parse(JSON.stringify(directory)),
	});
}

export async function addFile(file: any, path: string) {
	const pR = ref(db, `${PATH_USERS}/${path}`);
	return set(pR, file);
}

export async function removeFileWithPath(path: string) {
	return remove(ref(db, path));
}

export const readGetOnce = async (path: string) => {
	const refDB = ref(db);
	const snapshot = await get(child(refDB, path));
	return snapshot.val();
};
