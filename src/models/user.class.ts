import { Content } from "./structure-files/content.interface";
import { File } from "./structure-files/file.class";

export class User {
	private _username: string;
	private _email: string;
	private _id: string;
	private _directory: { [key: string]: Content };

	constructor(username: string, email: string, id: string, directory: {}) {
		this._id = id;
		this._username = username;
		this._email = email;
		this._directory = directory || {};
	}

	public get username() {
		return this._username;
	}
	public get email() {
		return this._email;
	}
	public get id() {
		return this._id;
	}
	public get directory() {
		return this._directory;
	}

	public addFile(file: Content) {
		this._directory[file.name] = file;
	}

	public set id(id: string) {
		this._id = id;
	}
	public set username(name: string) {
		this._username = name;
	}
	public set email(email: string) {
		this._email = email;
	}
}
