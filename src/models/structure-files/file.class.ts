import { Content } from "./content.interface";
import { Music } from "../music.class";
import { TypeArchive } from "../type-archive.enum";
export class File extends Content {
	private _music: Music;
	constructor(name: string, path: string, creationDate?: string) {
		super(name, TypeArchive.FILE, path, creationDate);
		this._music = new Music("", "", "", {
			bpm: 0,
			compass: 0,
			statePoinst: [],
		});
	}
	public set music(music: Music) {
		this._music = music;
	}
	public get music() {
		return this._music;
	}
	/**
   * size
 :number  */
	public size(): number {
		return 1;
	}
}
