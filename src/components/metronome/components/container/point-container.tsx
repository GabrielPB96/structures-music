import { PointModel } from "../../models/point.class";
import PointComponent from "../pure/point-component";

import "../../styles/style-point-container.css";
import { useEffect } from "react";

type PropsContainer = {
  points: PointModel[];
  action: Function;
};

const PointContainer = ({ points, action }: PropsContainer) => {
  return (
    <div className="point-container">
      {points.map((e, i) => (
        <PointComponent point={e} key={`container ${i}`} action={action} />
      ))}
    </div>
  );
};

export default PointContainer;
