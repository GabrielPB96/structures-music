import { State } from "../models/state.enum";

export interface PointModel {
  active: boolean;
  state: State;
}

export class Point {
  active: boolean;
  state: State;

  constructor(active: boolean, state: State) {
    this.active = active;
    this.state = state;
  }
}
