import { TypeArchive } from "../type-archive.enum";
import { Content } from "./content.interface";

export class Folder extends Content {
	private _children: { [key: string]: Content };
	constructor(name: string, path: string, creationDate?: string) {
		super(name, TypeArchive.FOLDER, path, creationDate);
		this._children = {};
	}
	public get children() {
		return this._children;
	}

	public add(content: Content) {
		this._children[content.name] = content;
	}

	/**
   c size
   */
	public size(): number {
		let count: number = 0;
		for (let ob in this._children) {
			let current: Content = this._children[ob];
			if (current.type === TypeArchive.FOLDER) {
				count += current.size();
			} else {
				count += current.size();
			}
		}
		return count;
	}
}
