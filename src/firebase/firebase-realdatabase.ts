// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getDatabase,
	ref,
	set,
	onValue,
	update,
	remove,
} from "firebase/database";
import { File } from "../models/structure-files/file.class";
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

export async function createUser(uid: string, username: string, email: string) {
	const newRef = ref(db, `${PATH_USERS}${uid}`);
	let default_file: File = new File(
		"File",
		`${PATH_USERS}${uid}/directory/File`
	);
	let directory: { [key: string]: any } = {};
	directory[default_file.name] = default_file;
	return set(newRef, {
		uid,
		username,
		email,
		directory: JSON.parse(JSON.stringify(directory)),
	});
}

export async function readUser(idUser: string) {
	return new Promise((solve, reject) => {
		const userRef = ref(db, `${PATH_USERS}${idUser}`);
		onValue(userRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data);
			solve(data);
		});
	});
}

export async function readDataUser(path: string) {
	return new Promise((s, r) => {
		const dataRef = ref(db, `${PATH_USERS}${path}`);
		onValue(dataRef, (snapshot) => {
			const data = snapshot.val();
			s(data);
		});
	});
}

export async function addFile(file: any, path: string) {
	const pR = ref(db, `${PATH_USERS}${path}`);
	return set(pR, file);
}

export async function removeFileWithPath(path: string) {
	return await remove(ref(db, path));
}
