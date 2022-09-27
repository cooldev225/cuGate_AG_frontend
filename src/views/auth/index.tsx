import React, { useEffect,useState, Fragment, useContext } from "react";
import { SplashPage } from "../splash";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../assets/scss/auth/index.scss";
import Localization from "../../contexts/localization";

export const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { strings } = useContext(Localization);
  const { login,register,isAuthenticated } = useAuth() as any;
  const [isTimer, setTimer] = useState(true);
  
  useEffect(()=>{
    setTimeout(() => setTimer(false), 2000);
  },[]);

  return (
    isTimer ? (
      <SplashPage/>
    ) : (
      <div className={"auth-page"}>
        <div className="container">
          <div className="form">
            <div className="content">
              
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AuthPage;
