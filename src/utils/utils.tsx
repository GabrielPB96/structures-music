import { ref, set } from "firebase/database";
import { Folder } from "../models/structure-files/folder.class";
import { db } from "../firebase/firebase-realdatabase";
import { File } from "../models/structure-files/file.class";
import { TypeArchive } from "../models/type-archive.enum";
import { Content } from "../models/structure-files/content.interface";

export enum StateReadFile {
	LOADING = "LOADING",
	EMPTY = "EMPTY",
	FILE = "FILE",
	FOLDER = "FOLDER",
	SEARCH_EMPTY = "SEARCH_EMPTY",
}
export type StateRead = {
	state: StateReadFile;
	content: any;
};

export interface TypeChildren {
	[key: string]: Content;
}

export const objectToArray = (directory: TypeChildren): Content[] => {
	let list: Content[] = [];
	list = Object.values(directory);

	return list.length ? sortListFiles(list) : list;
};

export const createFolderWithPath = async (
	nameFolder: string,
	absolutePath: string
) => {
	let folder: Folder = new Folder(
		nameFolder,
		`${absolutePath}/_children/${nameFolder}`
	);
	return set(
		ref(db, `${absolutePath}/_children/${nameFolder}`),
		JSON.parse(JSON.stringify(folder))
	);
};

export const sortListFiles = (array: Content[]): Content[] => {
	let res: Content[] = [];
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

export const lastFileFromUrl = (url: string) => {
	const cleanUrl = url.split("/").pop();
	return cleanUrl;
};
export const removeLastFileFromPath = (path: string) => {
	const pathArray = path.split("/");
	if (pathArray[pathArray.length - 1] !== "directory") {
		pathArray.pop();
		pathArray.pop();
	}
	return pathArray.join("/");
};

const objetoFolderToFolder = (ob: any) => {
	let fold = new Folder(ob._name, ob._path);
	if (ob._children) {
		for (let childKey in ob._children) {
			let child = ob._children[childKey];
			if (child._type === TypeArchive.FILE) {
				fold.add(new File(child.name, child.path));
			} else {
				let childFold = objetoFolderToFolder(child);
				fold.add(childFold);
			}
		}
	}
	return fold;
};

export const searchFile = (fold: any, nameFile: string): any => {
	let filesMacht = [];
	let file: any;
	if (fold) {
		for (file of fold) {
			if (file._name.toLowerCase().startsWith(nameFile.toLowerCase())) {
				filesMacht.push(file);
			}

			if (file._type === "folder" && file._children) {
				let newFold: Content[] = objectToArray(file._children);
				if (newFold) filesMacht.push(...searchFile(newFold, nameFile));
			}
		}
	}
	return filesMacht;
};

export const getFormatDate = (date: string) => {
	const dateArray = date.split(" ");
	if (dateArray.length < 6) return "0 de 0 de 0 00:00:00";
	const year = dateArray[4];
	let format = `${dateArray.slice(0, 3)}`;
	if (parseInt(year, 10) !== new Date().getFullYear()) {
		format += ` de ${dateArray[4]}`;
	}
	format = `${format.replace(/,/g, " ")} ${dateArray.pop()}`;
	return format;
};
