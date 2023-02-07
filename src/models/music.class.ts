import { ConfigMetronome } from "../components/metronome/utils/utils";

export class Music {
  private _title: string;
  private _autor?: string;
  private _album?: string;
  private _metronome: ConfigMetronome;
  private _estructure: string;

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
