// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile as updateP,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	setDoc,
	doc,
	getDoc,
	query,
	getDocs,
} from "firebase/firestore";
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
			const userLocalStore = localStorage.getItem("user");
			if (!userLocalStore) {
				setUser(user);
				localStorage.setItem("user", JSON.stringify(user));
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

type UserUpdate = {
	displayName?: string;
	email?: string;
	photoURL?: string;
};
export const updateProfile = async (userData: UserUpdate) => {
	let user: any = auth.currentUser;
	return updateP(user, userData);
};

// Initialize Cloud Firestore and get a reference to the service
const fs = getFirestore(app);

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
	await setDoc(doc(fs, nameCollection, nameDoc), data);
}

export async function createUser(username: string, data: any) {
	await addDocCollection(username, "users", data);
}

export function PARSEOBJECT(ob: any) {
	return JSON.parse(JSON.stringify(ob));
}

export async function readDoc(collection: string, nameDoc: string) {
	const docRef = doc(fs, collection, nameDoc);
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

export async function readExactProperty(
	nameCollection: string,
	nameDoc: string,
	property: string
) {
	const q = query(collection(fs, "users/GabrielPB96/direc"));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.id, " => ", doc.data());
	});
}
/**
 * await setDoc(doc(db, "users", "GabrielPB96"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
 */
