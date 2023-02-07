import { PointModel } from "../../models/point.class";
import { State } from "../../models/state.enum";

import "../../styles/style-point.css";

type PropsPoint = {
  point: PointModel;
  action: Function;
};

type PropsIcon = {
  state: State;
};
const Icon = ({ state }: PropsIcon) => {
  let color = "yellow";
  let children = <circle cx="8" cy="8" r="8" />;
  switch (state) {
    case State.HIGH:
      color = "red";
      break;
    case State.MUTE:
      color = "gray";
      children = (
        <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
      );
      break;
  }
  let icon = (
    <svg width="25" height="25" fill={color} viewBox="0 0 16 16">
      {children}
    </svg>
  );
  return icon;
};

const PointComponent = ({ point, action }: PropsPoint) => {
  /*useEffect(() => {
    if (point.active) {
      if (point.state === State.HIGH) {
        TICK.play();
      } else if (point.state === State.LOW) {
        TACK.play();
      }
    }
  }, [point]);*/
  return (
    <div
      className={`point ${point.active ? "is-active" : ""}`}
      onClick={() => action(point)}
    >
      <Icon state={point.state} />
    </div>
  );
};

export default PointComponent;
