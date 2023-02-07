import { useEffect } from "react";

type PropsRangeBpm = {
  value: number;
  setBpm: Function;
};

const RangeBpm = ({ value, setBpm }: PropsRangeBpm) => {
  return (
    <input
      className="range"
      type="range"
      min="20"
      max="300"
      value={value}
      onChange={(event) => {
        let newBpm = parseInt(event.target.value);
        setBpm(newBpm, "");
      }}
    />
  );
};

export default RangeBpm;
