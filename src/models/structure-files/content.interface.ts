import { CustomDate } from "../date";

export abstract class Content {
	_name: string;
	_creationDate: string;
	_type: string;
	_path: string;

	constructor(name: string, type: string, path: string, creationDate?: string) {
		this._name = name;
		this._creationDate = creationDate || new CustomDate().format;
		this._type = type;
		this._path = path;
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

	public abstract size(): number;
}
