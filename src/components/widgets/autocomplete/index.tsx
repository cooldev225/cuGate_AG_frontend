import styled from "styled-components";
import "../../../assets/scss/widgets/autocomplete.scss";
import React, { useEffect, useState } from "react";
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
    items,
    width,
    borderColor,
  } = props;

  const [_value, set_value] = useState(value);
  const [_open, set_open] = useState(false);
  const [_items, set_items] = useState<any>(items);

  useEffect(() => {
    if(_value!==""){
      let list = items?.filter((item: any)=>item["title"].indexOf(_value)>-1);
      set_items(list);
    }else{
      set_items(items);
    }
  }, [_value]);
  const changeValue = (v: any) => {
    set_value(v);
  };

  return (
    <Container
      className="cugate-autocomplete"
      width={width}
      borderColor={borderColor}
    >
      {items && (
        <Menu
          open={_open}
          value={_value}
          menuItems={_items}
          menuItemKeyProperty="title"
          menuItemLabelProperty="title"
          selectedColor={borderColor}
          activator={
            <></>
          }
          onChange={set_value}
        />
      )}
      <input
        type="text"
        value={_value}
        onChange={(e)=>changeValue(e.target.value)}
        placeholder="Search"
        onFocus={()=>set_open(true)}
        onKeyUp={(e)=>{
          if(e.keyCode===13&&_open&&_items.filter((item:any)=>item["title"]===_value).length){
            props.onChange&&props.onChange(_value);
            set_open(false);
            set_value("");
          }
        }}
      />
      <div 
        className={"search-icon" + (items&&items.filter((item: any)=>item["title"]===_value).length?" active":"")}
        onClick={()=>{
          if(_open){
            props.onChange&&props.onChange(_value);
            set_open(false);
            set_value("");
          }
        }}
      >
        <Icon name="plus" color={borderColor}/>
      </div>
    </Container>
  );
};

export default AutoComplete;
