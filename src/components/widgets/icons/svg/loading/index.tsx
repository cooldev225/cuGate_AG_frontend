const Icon: React.FC<IconProps> = ({
  color = "currentColor",
  width = "80px",
  height = "25px",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <rect x="20.5" y="34.5" width="9" height="31" fill="#00cbd8">
        <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="23.65;34.5;34.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
        <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="52.7;31;31" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
      </rect>
      <rect x="45.5" y="34.5" width="9" height="31" fill="#d7e6d0">
        <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="26.362499999999997;34.5;34.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
        <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="47.275000000000006;31;31" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
      </rect>
      <rect x="70.5" y="34.5" width="9" height="31" fill="#ffffff">
        <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="26.362499999999997;34.5;34.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
        <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="47.275000000000006;31;31" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
      </rect>
    </svg>
  );
};

export default Icon;
