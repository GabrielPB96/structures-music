// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	setDoc,
	doc,
	getDoc,
} from "firebase/firestore";
import { File } from "../models/structure-files/file.class";
import { Folder } from "../models/structure-files/folder.class";

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

export const stateChanged = (action: any) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			action(user);
			console.log("sing in");
		} else {
			action(null);
			console.log("logout");
		}
	});
};

export const signUp = async (
	username: string,
	email: string,
	password: string
) => {
	await createUserWithEmailAndPassword(auth, email, password);
	let user: any = auth.currentUser;
	await updateProfile(user, {
		displayName: username,
	});
};

export const signIn = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
	return signOut(auth);
};

export const singUpGoogle = async () => {
	const provider = new GoogleAuthProvider();

	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			let token;
			if (credential) token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			console.log(errorMessage);
		});
};

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//console.log(db);

/*async function addUser(username: string, email: string, id: string) {
	try {
		const docRef = await addDoc(collection(db, "/users"), {
			username,
			email,
			id,
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}*/

export async function addDocCollection(
	nameDoc: string,
	nameCollection: string,
	data: any
) {
	await setDoc(doc(db, nameCollection, nameDoc), data);
}

export async function createUser(username: string, data: any) {
	await addDocCollection(username, "users", data);
}

export function PARSEOBJECT(ob: any) {
	return JSON.parse(JSON.stringify(ob));
}

export async function readDoc(collection: string, nameDoc: string) {
	const docRef = doc(db, collection, nameDoc);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		//console.log("Document data:", docSnap.data());
		return new Promise((solve) => {
			solve(docSnap.data());
		});
	} else {
		// doc.data() will be undefined in this case
		//console.log("No such document!");
		return new Promise((s, r) => {
			r("NULL DATA");
		});
	}
}
