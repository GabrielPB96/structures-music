import React, { MouseEventHandler, useEffect, useState } from "react";
import Loading from "./loading";

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

const Confirm = ({ message, accept, cancel }: Props) => {
	return (
		<div className="confirm-modal" style={styleModal}>
			<section style={styleContainer}>
				<p style={styleMessage}>{message}</p>
				<div className="container-options" style={styleOptions}>
					<button className="button" type="button" onClick={() => accept()}>
						Accept
					</button>
					<button className="button" type="button" onClick={() => cancel()}>
						Cancel
					</button>
				</div>
			</section>
		</div>
	);
};

const ConfirmModal = ({ message, accept, cancel }: Props) => {
	const [run, setRun] = useState<boolean>(false);
	const hadleAction = async (fun: Function) => {
		setRun(true);
		await fun();
		setRun(false);
	};
	return (
		<>
			{run ? (
				<Loading />
			) : (
				<Confirm
					message={message}
					accept={() => hadleAction(accept)}
					cancel={() => hadleAction(cancel)}
				/>
			)}
		</>
	);
};

export default ConfirmModal;
