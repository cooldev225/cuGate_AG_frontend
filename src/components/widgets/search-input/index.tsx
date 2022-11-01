import { useMemo } from "react";
import styled from "styled-components";
import "../../../assets/scss/widgets/input.scss";

const Container = styled.div`
  --cugate-input-color: ${(props) => props.theme.color};
  --cugate-input-text-color: ${(props) => props.theme.textColor};
  --cugate-input-border-radius: ${(props) => props.theme.borderRadius}px;
  --cugate-input-width: ${(props) => props.theme.width};
`;

export const SearchInput: React.FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    type = "text",
    color = "white",
    textColor = "var(--color-blue-dark)",
    width = "100px",
    borderRadius = 40,
    placeholder = "",
    length = 10000,
    value = "",
    error="",
    example="",
  } = props;
  
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
        width: width,
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
        }}
      />
      <div className="error-code" style={{display:error===''?'none':'block'}}><span>{error}</span></div>
      <div className="help-text" style={{display:example!==''&&error===''?'block':'none'}}><span>{example}</span></div>
      <div className="hr" style={{display:'none'}}><hr/></div>
    </Container>
  );
};