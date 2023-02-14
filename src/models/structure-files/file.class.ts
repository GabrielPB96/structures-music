import { Content } from "./content.interface";
import { Music } from "../music.class";
import { TypeArchive } from "../type-archive.enum";
import { Point } from "../../components/metronome/models/point.class";
import { State } from "../../components/metronome/models/state.enum";
export class File extends Content {
	_music: Music;
	constructor(name: string, path: string, creationDate?: string) {
		super(name, TypeArchive.FILE, path, creationDate);
		this._music = new Music("Unknown", "", "", {
			bpm: 100,
			compass: 4,
			statePoints: [
				new Point(true, State.HIGH),
				new Point(false, State.LOW),
				new Point(false, State.LOW),
				new Point(false, State.LOW),
			],
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
