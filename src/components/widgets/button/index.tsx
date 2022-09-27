import { useMemo } from "react";
import styled from "styled-components";
import "../../../assets/scss/widgets/button.scss";

type Props = ButtonProps;

const Container = styled.button`
  --bazar-button-color: ${(props) => props.theme.color};
  --bazar-button-text-color: ${(props) => props.theme.textColor};
  --bazar-button-border-color: ${(props) => props.theme.borderColor};
  --bazar-button-border-radius: ${(props) => props.theme.borderRadius}px;
`;

export const Button: React.FC<Props> = (props) => {
  const {
    className,
    disabled,
    color = "#e9822d",
    textColor = "white",
    borderColor,
    borderRadius = 10,
  } = props;

  const class_name = useMemo<string>(() => {
    const class_name = ["default-button"];
    disabled && class_name.push("disabled");
    className && class_name.push(className);
    return class_name.join(" ");
  }, [disabled, className]);

  return (
    <Container
      className={class_name}
      onClick={props.onClick}
      theme={{
        color:color,
        textColor:textColor,
        borderColor:borderColor,
        borderRadius:borderRadius,
      }}
    >
      <div className="content">{props.children}</div>
    </Container>
  );
};

export default Button;
