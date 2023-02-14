import { ref, set } from "firebase/database";
import ComponentList from "../components/container/component-list";
import { Folder } from "../models/structure-files/folder.class";
import { db } from "../firebase/firebase-realdatabase";
import { File } from "../models/structure-files/file.class";
import { TypeArchive } from "../models/type-archive.enum";
import { Content } from "../models/structure-files/content.interface";

export enum StateReadFile {
	LOADING,
	EMPTY,
	FILE,
	FOLDER,
}
export type StateRead = {
	state: StateReadFile;
	content: null | TypeChildren[];
};

interface TypeChildren {
	[key: string]: Content;
}

export const objectToArray = (directory: TypeChildren): Content[] => {
	let list: Content[] = [];
	list = Object.values(directory);

	return list.length ? sortListFiles(list) : list;
};

export const arrayComponentList = (
	directory: TypeChildren[],
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

const objetoFolderToFolder = (ob: Folder) => {
	let fold = new Folder(ob._name, ob._path);
	if (ob._children) {
		for (let childKey in ob._children) {
			let child = ob._children[childKey];
			if (child._type === TypeArchive.FILE) {
				fold.add(new File(child.name, child.path));
			} else {
				if (child instanceof Folder) {
					let childFold = objetoFolderToFolder(child);
					fold.add(childFold);
				}
			}
		}
	}
	return fold;
};

export const searchFile = (fold: Content[], nameFile: string): Content[] => {
	let filesMacht: Content[] = [];
	let file: Content;
	for (file of fold) {
		if (file._name.toLowerCase().startsWith(nameFile.toLowerCase())) {
			filesMacht.push(file);
		}
		if (file instanceof Folder && file._children) {
			let newFold: Content[] = objectToArray(file._children);
			if (newFold) filesMacht.push(...searchFile(newFold, nameFile));
		}
	}
	return filesMacht;
};
