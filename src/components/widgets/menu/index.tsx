import React, { useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useMenuPosition } from "../../../utils/getMenuPosition";
import "../../../assets/scss/widgets/menu.scss";

interface Prop {
  styles?: any;
  maxHeight?: string | number;
  selectedColor?: string;
};
const Container = styled.div`
  ${(props:Prop) => props.styles.width && `min-width:${props.styles.width}px`};
  ${(props:Prop) => props.styles.top && `top:${props.styles.top + 1}px`};
  ${(props:Prop) => props.styles.bottom && `bottom:${props.styles.bottom}px`};
  ${(props:Prop) => props.styles.left && `left:${props.styles.left + 3}px`};
  ${(props:Prop) => props.styles.right && `right:${props.styles.right}px`};
  --cugate-menu-selected-color: ${(props) => props.selectedColor};
  max-height: ${(props) =>
    typeof props.maxHeight === "string"
      ? props.maxHeight
      : `${props.maxHeight}px`};
`;

interface Props extends MenuProps {
  onChange?: (value: any) => void;
  onChangeOpen?: (value?: boolean) => void;
  children?: React.ReactNode;
}

export const Menu: React.FC<Props> = (props) => {
  const {
    activator,
    menuItems,
    menuItemKeyProperty="value",
    menuItemLabelProperty="label",
    disabled=false,
    selectedColor="var(--color-blue-dark)",
    maxHeight = 260,
    inline = false,
    open = false,
    value,
  } = props;

  const [state, setState] = useState<{
    open: boolean;
    position: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
      width?: number;
    };
  }>({
    open: false,
    position: {},
  });
  const activatorRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLElement>(null);
  const position = useMenuPosition(activatorRef, "vertical");

  const _className = useMemo(() => {
    const class_name = ["cugate-menu-widget"];
    inline && class_name.push("inline");
    return class_name.join(" ");
  }, [inline]);

  useEffect(() => {
    if(value!==""){
      let _open = true;
      if(menuItems&&menuItems?.filter((m:any)=>{
        return m[menuItemLabelProperty]===value
      }).length){
      _open = false;
      }
      setState({
        ...state,
        open:_open,
      });
    }
  }, [value]);

  useEffect(() => {
    setState({
      ...state,
      open:open,
    });
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (activatorRef && activatorRef.current) {
         if (activatorRef.current && activatorRef.current.contains(event.target)) {
           return;
         } else {
          setState({ ...state, open: false });
         }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activatorRef]);

  const onMenuItemClick = (value: MenuItemProps): void => {
    setState({
      ...state,
      open:false,
    });
    if (typeof value === "object" && value.action) {
      value.action();
    }
    props.onChange &&
      props.onChange(typeof value === "string" ? value : value[menuItemKeyProperty]);
  };

  const getRef = (item: MenuItemProps): any => {
    if (typeof item === "object") {
      return item[menuItemKeyProperty] === value ? { ref: selectedItemRef } : {};
    } else {
      return item === value ? { ref: selectedItemRef } : {};
    }
  };

  return (
    <div className={_className} ref={activatorRef}>
      <div
        className="content"
        onClick={() => !disabled && setState({ ...state, open: !state.open })}
      >
        {activator}
      </div>
      <Container
        className={`menu-container${state.open&&!disabled ? " open" : ""}`}
        styles={position}
        maxHeight={maxHeight}
        selectedColor={selectedColor}
      >
        {Array.isArray(menuItems)&&menuItems.length ? (
          <ul>
            {menuItems.map((item, index) => (
              <li
                data-key={index}
                key={index}
                onClick={() => onMenuItemClick(item)}
                {...getRef(item)}
              >
                {props.renderItem ? (
                  props.renderItem(item)
                ) : (
                  <div className="content">
                    {typeof item === "string" ? item : item[menuItemLabelProperty]}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          props.children
        )}
      </Container>
    </div>
  );
};
