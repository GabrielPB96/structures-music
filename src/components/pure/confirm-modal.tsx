import React, { useEffect } from "react";

type Props = {
	message: string;
	accept: Function;
	cancel: Function;
};
const styleModal: React.CSSProperties = {
	position: "fixed",
	left: "0",
	bottom: "0",
	right: "0",
	top: "0",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",

	background: "rgba(33, 41, 52, 0.85)",
};

const styleOptions: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	gap: "1em",
};

const styleContainer: React.CSSProperties = {
	width: "fit-content",
	height: "fit-content",
	padding: "2em",
	borderRadius: "10px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	gap: "1em",
	backgroundColor: "#e9e8e8",
	color: "hsl(214, 84%, 56%)",
};

const styleMessage: React.CSSProperties = {
	textAlign: "center",
};

let state: null | boolean;
let id: any = undefined;

const actionModal = () => {
	return new Promise((solve) => {
		id = setInterval(() => {
			if (state !== null) {
				clearInterval(id);
				//console.log("FIN");
				solve(state);
			}
			//console.log("run");
		}, 1000);
	});
};

const ConfirmModal = ({ message, accept, cancel }: Props) => {
	 useEffect(() => {
	 	state = null;
	 	actionModal().then((state) => {
	 		if (state) {
	 			accept();
	 		} else {
	 			cancel();
	 		}
	 	});
	 	return () => {
	 		clearInterval(id);
	 	};
	 }, []);
	return (
		<div className="confirm-modal" style={styleModal}>
			<section style={styleContainer}>
				<p style={styleMessage}>{message}</p>
				<div className="container-options" style={styleOptions}>
					<button
						type="button"
						onClick={() => {
							state = true;
						}}
					>
						Accept
					</button>
					<button
						type="button"
						onClick={() => {
							state = false;
						}}
					>
						Cancel
					</button>
				</div>
			</section>
		</div>
	);
};

export default ConfirmModal;
