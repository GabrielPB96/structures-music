type PropsOptionsCompases = {
  action: Function;
};

const OptionsCompases = ({ action }: PropsOptionsCompases) => {
  const compases: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16
  ];
  return (
    <select
      onChange={(event) => {
        action(parseInt(event.target.value));
      }}
    >
      {compases.map((e, i) => (
        <option value={e} key={`opts${i}`}>
          {e}
        </option>
      ))}
    </select>
  );
};

export default OptionsCompases;
