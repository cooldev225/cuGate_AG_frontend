const Icon: React.FC<IconProps> = ({
  color = "currentColor",
  width = "1.125em",
}) => {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 9L8.5 1" stroke="#037A9A" stroke-miterlimit="10"/>
      <path d="M8.5 9L0.5 1" stroke="#037A9A" stroke-miterlimit="10"/>
    </svg>
  );
};

export default Icon;
