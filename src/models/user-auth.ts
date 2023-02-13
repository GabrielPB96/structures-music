import { Folder } from "./structure-files/folder.class";

export interface UserAuth {
	username: string;
	email: string;
	uid: string;
	directory: Folder;
}
