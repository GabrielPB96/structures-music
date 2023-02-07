import { Point, PointModel } from "../models/point.class";
import { State } from "../models/state.enum";

export type ConfigMetronome = {
	compass: number;
	bpm: number;
	statePoinst: PointModel[];
};

export const arrayStatesToArrayPoints = (array: Array<PointModel>) => {
	let res: PointModel[] = [];
	for (let o of array) {
		res.push(new Point(o.active, o.state));
	}
	return res;
};

export const compChange = (
	current: PointModel[],
	ant: PointModel[]
): PointModel[] => {
	for (let i = 0; i < current.length; i++) {
		if (i < ant.length) {
			current[i].state = ant[i].state;
		}
	}
	return current;
};

export const bpmToSeg = (bpm: number): number => {
	return (60 / bpm) * 1000;
};

export const getPoints = (compas: number): PointModel[] => {
	let points: PointModel[] = [];
	for (let i = 1; i <= compas; i++) {
		points.push(new Point(false, State.LOW));
	}
	return points;
};

export const nextState = (state: State): State => {
	switch (state) {
		case State.LOW:
			return State.HIGH;
		case State.HIGH:
			return State.MUTE;
		default:
			return State.LOW;
	}
};
