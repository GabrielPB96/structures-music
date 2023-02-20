import { Folder } from "./structure-files/folder.class";

export interface UserAuth {
	displayName: string;
	email: string;
	uid: string;
	directory: Folder;
	photoURL: string;
}
