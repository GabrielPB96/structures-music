import Metronome from "../metronome/components/container/metronome";
import { arrayStatesToArrayPoints } from "../metronome/utils/utils";
type PropsDetail = {
  _name: string;
  _creationDate: string;
  _type: string;
  _music: {
    _title: string;
    _autor?: string;
    _album?: string;
    _metronome: {
      bpm: number;
      compass: number;
      statePoints: [];
    };
    _estructure: string;
  };
};
type Props = {
  props: PropsDetail;
};
const FileContentView = ({ props }: Props) => {
  return (
    <div>
      <section>
        <header>
          <h1>{props._music._title}</h1>
          <p>Fecha: {props._creationDate}</p>
          <p>Autor: {props._music._autor}</p>
        </header>
        <div>
          <Metronome
            compassInit={props._music._metronome.compass}
            customMetronome={{
              bpm: props._music._metronome.bpm,
              compass: props._music._metronome.compass,
              statePoinst: arrayStatesToArrayPoints(
                props._music._metronome.statePoints
              )
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default FileContentView;
