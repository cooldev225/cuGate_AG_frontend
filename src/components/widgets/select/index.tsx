import { useMemo } from "react";
import styled from "styled-components";
import "../../../assets/scss/widgets/select.scss";
import { Menu } from "../menu";

const Container = styled.div`
  --cugate-select-color: ${(props) => props.theme.color};
  --cugate-select-text-color: ${(props) => props.theme.textColor};
  --cugate-select-width: ${(props) => props.theme.width};
  --cugate-select-border-radius: ${(props) => props.theme.borderRadius}px;
`;

export const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    disabled=false,
    color = "white",
    width = "100%",
    textColor = "var(--color-blue-dark)",
    borderRadius = 10,
    items = [],
    value = "",
  } = props;
  
  const class_name = useMemo<string>(() => {
    const class_name = ["custom-select"];
    disabled && class_name.push("disabled");
    className && class_name.push(className);
    return class_name.join(" ");
  }, [disabled, className]);

  return (
    <Container
      className={class_name}
      theme={{
        width:width,
        color:color,
        textColor:textColor,
        borderRadius:borderRadius,
      }}
    >
      <Menu
          menuItems={items}
          disabled={disabled}
          activator={<div className="w-100 d-flex align-items-center" style={{marginLeft:'15px'}}>{items.find((item)=>item.value===value)?.label}</div>}
          selectedColor={textColor}
          onChange={props.onChange}
      />
    </Container>
  );
};