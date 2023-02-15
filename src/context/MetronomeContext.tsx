import { FC, ReactNode, createContext, useState } from "react";
import { Point } from "../components/metronome/models/point.class";
import { State } from "../components/metronome/models/state.enum";

const MetronomeContext = createContext({
	stateMetronome: {
		bpm: 0,
		compass: 4,
		statePoints: [
			new Point(false, State.LOW),
			new Point(false, State.LOW),
			new Point(false, State.LOW),
			new Point(false, State.LOW),
		],
	},
	setStateMetronome: (newState: StateMetronome) => {},
});

export type StateMetronome = {
	bpm: number;
	compass: number;
	statePoints: Point[];
};

type Props = {
	children: ReactNode;
};

const MetronomeProvider: FC<Props> = ({ children }) => {
	const [stateMetronome, setStateMetronome] = useState<StateMetronome>({
		bpm: 0,
		compass: 4,
		statePoints: [
			new Point(false, State.LOW),
			new Point(false, State.LOW),
			new Point(false, State.LOW),
			new Point(false, State.LOW),
		],
	});

	return (
		<MetronomeContext.Provider value={{ stateMetronome, setStateMetronome }}>
			{children}
		</MetronomeContext.Provider>
	);
};

export { MetronomeProvider };
export default MetronomeContext;
