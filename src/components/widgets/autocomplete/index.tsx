import styled from "styled-components";
import "../../../assets/scss/widgets/autocomplete.scss";
import React, { Fragment, useEffect, useState } from "react";
import { Menu } from "../menu";
import { Icon } from "../icons";

const Container = styled.div`
  width: ${(props: SearchProps) => 
    typeof props.width === "string" ? props.width : `${props.width}px`};
  --cugate-autocomplete-border-color: ${(props) => props.borderColor};
`;
export const AutoComplete: React.FC<SearchProps> = (props) => {
  const { 
    value="",
    items=[],
    itemKeyProperty="value",
    itemLabelProperty="label",
    width,
    borderColor,
    disabled=false,
  } = props;

  const [_value, _set_value] = useState(value);
  const [_open, set_open] = useState(false);
  const [_items, set_items] = useState<any>(items);

  useEffect(() => {
    if(_value!==""){
      let list = items.filter((item: any)=>item[itemLabelProperty]?.indexOf(_value)>-1);
      set_items(list);
    }else{
      set_items(items);
    }
  }, [_value]);

  useEffect(() => {
    set_items(items);
  }, [items]);

  const changeValue = (v: any) => {
    let list = _items.filter((item: any)=>item[itemKeyProperty]===v);
    if(list.length){
      _set_value(list[0][itemLabelProperty]);
      props.onChange&&props.onChange(v);
      _set_value("");
      set_open(false);
    }
  };

  return (
    <Container
      className="cugate-autocomplete"
      width={width}
      borderColor={borderColor}
    >
      {items && (
        <Menu
          open={_open&&!disabled}
          value={value}
          menuItems={_items}
          menuItemKeyProperty={itemKeyProperty}
          menuItemLabelProperty={itemLabelProperty}
          selectedColor={borderColor}
          disabled={disabled}
          activator={
            <Fragment>
              <input
                type="text"
                value={_value}
                onChange={(e)=>_set_value(e.target.value)}
                placeholder="Search"
                disabled={disabled}
                onFocus={()=>set_open(true)}
                onKeyUp={(e)=>{
                  set_open(true);
                  if(e.keyCode===13){
                    let list = _items.filter((item:any)=>item[itemLabelProperty]===_value);
                    if(list.length){
                      changeValue(list[0][itemKeyProperty]);
                    }
                  }
                }}
                onClick={()=>set_open(true)}
              />
              <div 
                className={"search-icon" + (items&&items.filter((item: any)=>item[itemKeyProperty]===_value).length?" active":"")}
                onClick={()=>{
                  if(_open){
                    changeValue(value);
                    set_open(false);
                  }
                }}
              >
              <Icon name="plus" color={borderColor}/>
            </div>
            </Fragment>
          }
          onChange={changeValue}
        />
      )}
      
    </Container>
  );
};

export default AutoComplete;
