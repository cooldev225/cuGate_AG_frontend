import { useMemo, useState } from "react";
import styled from "styled-components";
import "../../../assets/scss/widgets/input.scss";
type Props = InputProps;

const Container = styled.div`
  --bazar-input-color: ${(props) => props.theme.color};
  --bazar-input-text-color: ${(props) => props.theme.textColor};
  --bazar-input-border-radius: ${(props) => props.theme.borderRadius}px;
`;

export const Input: React.FC<Props> = (props) => {
  const {
    className,
    disabled,
    type = "text",
    color = "white",
    textColor = "#e9822d",
    borderRadius = 10,
    placeholder = "",
    length = 10000,
    value = "",
    error="",
    example="",
  } = props;
  
  const [_value, _setValue] = useState("");
  const class_name = useMemo<string>(() => {
    const class_name = ["custom-input"];
    disabled && class_name.push("disabled");
    className && class_name.push(className);
    return class_name.join(" ");
  }, [disabled, className]);

  return (
    <Container
      className={class_name}
      theme={{
        color:color,
        textColor:textColor,
        borderRadius:borderRadius,
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={length}
        onChange={(e)=>{
          props.onChange && props.onChange(e.target.value);
          //_setValue('*'.repeat(value.length));
      }}/>
      <div className="error-code" style={{display:error===''?'none':'block'}}><span>{error}</span></div>
      <div className="help-text" style={{display:example!==''&&error===''?'block':'none'}}><span>{example}</span></div>
      <div className="hr" style={{display:'none'}}><hr/></div>
    </Container>
  );
};