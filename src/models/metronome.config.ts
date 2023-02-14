import { PointModel } from "../components/metronome/models/point.class";

export type ConfigMetronome = {
	bpm: number;
	compass: number;
	statePoints: PointModel[];
};
