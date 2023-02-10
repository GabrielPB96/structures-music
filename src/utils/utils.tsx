import { ref, set } from "firebase/database";
import ComponentList from "../components/container/component-list";
import { Folder } from "../models/structure-files/folder.class";
import { db } from "../firebase/firebase-realdatabase";
import { File } from "../models/structure-files/file.class";

interface TypeDirectory {
	[key: string]: any;
}
export const objectToArray = (directory: TypeDirectory) => {
	let list: any = [];
	for (let ob in directory) {
		list.push(directory[ob]);
	}

	return list.length ? sortListFiles(list) : null;
};

export const arrayComponentList = (
	directory: TypeDirectory[],
	actionRemove: Function
) => {
	let res: any[] = [];
	if (directory) {
		res = directory.map((e: any, k: number) => (
			<ComponentList
				type={e._type}
				title={e._name}
				textPreview={e._textPreview}
				createDate={e._creationDate}
				key={`clp${k}`}
				pathFile={e._path}
				actionRemove={actionRemove}
			/>
		));
	}
	return res;
};

export const createFolderWithPath = async (
	nameFolder: string,
	absolutePath: string
) => {
	let folder: Folder = new Folder(nameFolder, absolutePath);
	return await set(ref(db, absolutePath), JSON.parse(JSON.stringify(folder)));
};

export type Array = {
	_creationDate: string;
	_name: string;
	_path: string;
	_type: string;
	_directory?: {};
};
export const sortListFiles = (array: Array[]) => {
	let res: Array[] = [];
	for (let o of array) {
		if (o._type === "file") {
			res.unshift(o);
		} else {
			res.push(o);
		}
	}
	return res;
};

export const normalizeUserName = (userName: string) => {
	const lowerUserName = userName.toLowerCase();
	const userNameFormat = lowerUserName.split(" ").join("_");
	return userNameFormat;
};

export const getEmailNormalize = (username: string) => {
	const headerEmail = normalizeUserName(username);
	const email = `${headerEmail}@gmail.com`;
	return email;
};

export const capitalize = (text: string) => {
	const firstLetter = text.charAt(0);
	const newText = firstLetter.toUpperCase() + text.slice(1);
	return newText;
};

export const getUserNameFromEmail = (email: string) => {
	const headerEmail: string = email.split("@")[0];
	const names: string[] = headerEmail.split("_");
	let username: string = "";
	names.forEach((name, i) => {
		username += capitalize(name);
		if (i !== names.length - 1) username += " ";
	});
	return username;
};
