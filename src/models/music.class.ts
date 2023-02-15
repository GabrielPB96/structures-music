import { ConfigMetronome } from "../models/metronome.config";

export class Music {
	_title: string;
	_autor?: string;
	_album?: string;
	_metronome: ConfigMetronome;
	_structure: string;

	constructor(
		title: string,
		autor: string,
		album: string,
		metronome: ConfigMetronome
	) {
		this._title = title;
		this._autor = autor || "unknown";
		this._album = album || "unknown";
		this._metronome = metronome;
		this._structure = "...";
	}
	public get title() {
		return this._title;
	}
	public get autor() {
		return this._autor;
	}
	public get album() {
		return this._album;
	}
	public get metronome() {
		return this._metronome;
	}
}
