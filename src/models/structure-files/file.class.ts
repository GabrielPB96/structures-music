import { Content } from "./content.interface";
import { Music } from "../music.class";
import { TypeArchive } from "../type-archive.enum";
export class File extends Content {
  private _music: Music;
  constructor(name: string) {
    super(name, TypeArchive.FILE);
  }
  public set music(music: Music) {
    this._music = music;
  }
  /**
   * size
 :number  */
  public size(): number {
    return 1;
  }
}
