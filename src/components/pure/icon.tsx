type Props = {
  paths: Array<string>;
  width: number;
  height: number;
  color?: string;
};
const Icon = ({ paths, width, height, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color || "currentColor"}
      viewBox={`0 0 ${width} ${height}`}
    >
      {paths.map((e, k) => {
        return <path d={e} key={`icons ${k}`} />;
      })}
    </svg>
  );
};

export default Icon;
