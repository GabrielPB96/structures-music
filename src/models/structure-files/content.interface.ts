import { CustomDate } from "../date";

export abstract class Content {
	_name: string;
	_creationDate: string;
	_type: string;
	_path: string;
	_uid: string;

	constructor(name: string, type: string, path: string, creationDate?: string) {
		this._name = name;
		this._creationDate = creationDate || new CustomDate().fullDate;
		this._type = type;
		this._path = path;
		this._uid = Content.getUID();
	}
	static getUID() {
		const id = String(
			Date.now().toString(32) + Math.random().toString(16)
		).replace(/\./g, "");
		return id;
	}

	public get type() {
		return this._type;
	}
	public get name(): string {
		return this._name;
	}
	public get creationDate(): string {
		return this._creationDate;
	}
	public get path() {
		return this._path;
	}
	public get uid() {
		return this._uid;
	}

	public abstract size(): number;
}
