import React from "react";
import "../../assets/scss/inprocess.scss";
import { DefaultButton } from "../widgets";
import { useNavigate } from "react-router-dom";
export const Inprocess: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="inprocessing-page">
      <div className="logo-txt">
        <p>Sorry, this page is in developing...</p>
        <DefaultButton onClick={()=>navigate('/')}>Go home</DefaultButton>
      </div>
    </div>
  );
};

export default Inprocess;
