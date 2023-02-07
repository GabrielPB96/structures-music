import { useEffect, useState } from "react";
import { Metronome } from "../../models/metronome.class";
import { PointModel } from "../../models/point.class";
import {
  ConfigMetronome,
  getPoints,
  nextState,
  compChange
} from "../../utils/utils";

import PointContainer from "../container/point-container";
import RangeBpm from "../pure/range-bpm";
import OptionsCompases from "../pure/compases";
import { BtnPlayStop } from "../pure/button-play-stop";
import { State } from "../../models/state.enum";

import "../../styles/style-metronome.css";

type Props = {
  compassInit: number;
  customMetronome?: ConfigMetronome | undefined;
};

type TypeState = {
  points: PointModel[];
  ant: number;
  current: number;
};

const context: AudioContext = new AudioContext();
const metronomeObject: Metronome = new Metronome(context);

const MetronomeComponent = ({ compassInit, customMetronome }: Props) => {
  let customBpm = undefined,
    customCompass = undefined,
    customPoints: PointModel[] | undefined = undefined;
  if (customMetronome) {
    customBpm = customMetronome.bpm;
    customCompass = customMetronome.compass;
    customPoints = customMetronome.statePoinst;
  }
  const [bpm, setBpm] = useState<number>(customBpm || metronomeObject.bpm);
  const [compass, setCompass] = useState<number>(customCompass || compassInit);
  const points: PointModel[] =
    structuredClone(customPoints) || getPoints(compassInit);

  const [state, setState] = useState<TypeState>({
    points,
    ant: metronomeObject.antValue - 1,
    current: metronomeObject.currentValue - 1
  });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    metronomeObject.compass = compassInit;
    metronomeObject.bpm = bpm;
    metronomeObject.callback = setState;
    return () => {
      metronomeObject.stop();
    };
  }, []);
  useEffect(() => {
    if (play) {
      state.points[state.ant].active = false;
      state.points[state.current].active = true;
    }
    if (state.points[state.current].state === State.HIGH) {
      metronomeObject.frequency = 500;
    } else if (state.points[state.current].state === State.LOW) {
      metronomeObject.frequency = 250;
    } else {
      metronomeObject.frequency = 0;
    }
  }, [state, play]);
  useEffect(() => {
    let points: PointModel[] = getPoints(compass);
    points = compChange(points, state.points);
    let newCurrent: number = 0;
    if (compass > state.points.length) {
      newCurrent = state.current;
    }
    let newAnt: number = newCurrent - 1 < 0 ? compass - 1 : newCurrent - 1;
    metronomeObject.currentValue = newCurrent + 1;
    metronomeObject.antValue = newAnt + 1;
    setState({
      points,
      current: newCurrent,
      ant: newAnt
    });
  }, [compass]);

  const changeBpm = (value: number, type: string): void => {
    let newBpm = value;
    if (type === "incrementar") {
      newBpm = bpm + value;
    } else if (type === "decrementar") {
      newBpm = bpm - value;
    }
    metronomeObject.bpm = newBpm;
    setBpm(newBpm);
  };
  const changeCompass = (newCompass: number): void => {
    metronomeObject.compass = newCompass;
    setCompass(newCompass);
  };
  const run = () => {
    if (play) {
      metronomeObject.stop();
      let temp = structuredClone(state.points);
      for (let p of temp) {
        p.active = false;
      }

      setState({
        points: temp,
        current: 0,
        ant: compass - 1
      });
    } else {
      metronomeObject.play();
    }
    setPlay(!play);
  };
  const clickPoint = (point: PointModel): void => {
    let index = state.points.indexOf(point);
    let temp = structuredClone(state.points);
    temp[index].state = nextState(temp[index].state);
    setState({
      points: temp,
      current: state.current,
      ant: state.ant
    });
  };
  return (
    <div className="metronomo">
      <PointContainer points={state.points} action={clickPoint} />
      <div className="metronomo-container-buttons-bpm">
        <button
          className="btn-mas1"
          onClick={() => changeBpm(1, "incrementar")}
        >
          +1
        </button>
        <RangeBpm value={bpm} setBpm={changeBpm} />
        <button
          className="btn-menos1"
          onClick={() => changeBpm(1, "decrementar")}
        >
          -1
        </button>
        <p className="bpm">{`${bpm} BPM`}</p>
      </div>
      <div className="metronomo-options">
        <OptionsCompases action={changeCompass} />
        <BtnPlayStop play={play} run={run} dbClick={() => {}} />
      </div>
    </div>
  );
};

export default MetronomeComponent;
