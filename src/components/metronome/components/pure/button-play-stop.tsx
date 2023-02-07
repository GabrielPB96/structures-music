import { MouseEventHandler } from "react";

type PropsPlayStop = {
  play: boolean;
  run: MouseEventHandler;
  dbClick: MouseEventHandler;
};
export const BtnPlayStop = ({ play, run, dbClick }: PropsPlayStop) => {
  let path = !play
    ? "M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
    : "M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z";
  return (
    <button onClick={run} onDoubleClick={dbClick}>
      <svg width="30" height="30" fill="white" viewBox="0 0 30 30">
        <path d={path} />
      </svg>
    </button>
  );
};
