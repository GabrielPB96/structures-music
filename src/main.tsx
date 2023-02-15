import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";
import { AuthProvider } from "./context/AuthContext";

//logout();

import {} from "./firebase/firebase-realdatabase";

const o = {
	_creationDate: "2 de Enero",
	_music: {
		_album: "Cancion",
		_autor: "Marcos Witt",
		_metronome: {
			bpm: 120,
			compass: 4,
			statePoints: [
				{
					active: false,
					state: 1,
				},
				{
					active: false,
					state: 1,
				},
				{
					active: false,
					state: 1,
				},
				{
					active: false,
					state: 1,
				},
			],
		},
		_title: "Amaré",
	},
	_name: "Amaré",
	_type: "file",
};

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
	// <StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	// </StrictMode>
);
