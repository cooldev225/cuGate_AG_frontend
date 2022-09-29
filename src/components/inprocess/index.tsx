import React from "react";
import "../../assets/scss/inprocess.scss";
import { Button } from "../widgets";
import { useNavigate } from "react-router-dom";
export const Inprocess: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="inprocessing-page">
      <div className="logo-txt">
        <p>Sorry, this page is in developing...</p>
        <Button onClick={()=>navigate('/')}>Go home</Button>
      </div>
    </div>
  );
};

export default Inprocess;
