import React from "react";
import "../../assets/scss/splash.scss";
import icon from '../../assets/images/icon-cugate.svg';
export const SplashPage: React.FC = () => {
  return (
    <div className="splash-page">
      <div className="logo-img">
        <img src={icon}/>
      </div>
      <div className="logo-txt">
        Cugate
      </div>
    </div>
  );
};

export default SplashPage;
