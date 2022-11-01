import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import "../../../assets/scss/widgets/button.scss";
import { Icon } from "../icons";

type Props = ButtonProps;

const Container = styled.button`
  --cugate-button-color: ${(props) => props.theme.color};
  --cugate-button-text-color: ${(props) => props.theme.textColor};
  --cugate-button-border-color: ${(props) => props.theme.borderColor};
  --cugate-button-border-radius: ${(props) => props.theme.borderRadius}px;
`;

export const DefaultButton: React.FC<Props> = (props) => {
  const {
    className,
    disabled,
    color = "var(--color-blue-dark)",
    textColor = "white",
    borderColor,
    borderRadius = 40,
    type,
    loading = false,
  } = props;

  const class_name = useMemo<string>(() => {
    const class_name = ["default-button"];
    disabled && class_name.push("disabled");
    className && class_name.push(className);
    return class_name.join(" ");
  }, [disabled, className]);
  const [loading_str, set_loading_str] = useState("");
  useEffect(()=>{
    if(loading){
      setLoadingStr(0);
    }
  },[loading]);
  const setLoadingStr = (len: number) => {
    if(len===0)set_loading_str('.');
    else if(len===1)set_loading_str('..');
    else if(len===2)set_loading_str('...');
    setTimeout(() => {
      if(loading) setLoadingStr((len + 1) % 3);
    }, 300);
  };
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
      type={props.type==="submit"?"submit":"button"}
    >
      <div className={"content" + (loading?" static-width":"")}>
        {loading?(
          // <img src="loading.svg" alt=""/>
          <Icon name="loading"/>
        ):props.children}
      </div>
    </Container>
  );
};

export default DefaultButton;
