const Icon: React.FC<IconProps> = ({
  color = "#037A9A",
  width = "1.125em",
}) => {
  return (
    <svg width="15" height="15" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 9L8.5 1" stroke={color} strokeMiterlimit="10"/>
      <path d="M8.5 9L0.5 1" stroke={color} strokeMiterlimit="10"/>
    </svg>
  );
};

export default Icon;
