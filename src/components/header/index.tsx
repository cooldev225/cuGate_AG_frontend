import "../../assets/scss/header.scss";
import { menuList, menuRightList } from "./contents";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import icons from '../../assets/images/menu';
import user_icon from '../../assets/images/user.svg';
import alam_icon from '../../assets/images/alam.svg';
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../types/models/store";
import useAuth from "../../hooks/useAuth";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('cugate');
  const [noMenu, setNoMenu] = useState(true);
  const { login, register, isAuthenticated, user } = useAuth() as any;

  useEffect(() => {
    setNoMenu(true);
    menuList.map((value,index)=>{
      if(location.pathname.indexOf(value.url)>-1){
        setActiveItem(value.key);
        setNoMenu(false);
        return index;
      }
    });
    menuRightList.map((value,index)=>{
      if(location.pathname.indexOf(value.url)>-1){
        setActiveItem(value.key);
        setNoMenu(false);
        return index;
      }
    });

    dispatch({
      type: "SET_PAGE",
      payload: activeItem,
    });
  }, [location.pathname]);

  return (
    <Fragment>
      <nav id="navbar" className={"uk-navbar-container uk-navbar-transparent uk-light" + (noMenu?" noMenu":"")}>
        <div className="uk-background-secondary">
          <div className="uk-container uk-container-large">
            <div className="uk-navbar">
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav uk-text-large">
                  {
                    menuList.map((value,index)=>(
                      <li key={index} className={activeItem===value.key?"uk-active":""} onClick={()=>setActiveItem(value.key)}>
                        <Link onClick={(e)=>{e.preventDefault();navigate(value.url);}} to={""}>
                          <img alt={value.text} src={icons[value.icon]} style={{width:'32px'}}/>
                          <span className="uk-margin-small-left uk-visible@m"> 
                            {value.text}
                          </span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="uk-navbar-right uk-visible@m">
                <ul className="uk-navbar-nav uk-text-small">
                  {
                    menuRightList.map((value,index)=>(
                      <li key={index} className={activeItem===value.key?"uk-active":""} onClick={()=>setActiveItem(value.key)}>
                        <Link onClick={(e)=>{e.preventDefault();navigate(value.url);}} to={""}>
                          {value.text}
                        </Link>
                      </li>
                    ))
                  }
                  {
                    isAuthenticated?(
                      <li className="tools-bar-right">
                        <Link onClick={(e)=>{e.preventDefault();}} to={""}>
                          <img alt="login" src={alam_icon} style={{width:'24px',marginRight:5}}/>
                          <img alt="login" src={user_icon} style={{width:'24px'}}/>
                        </Link>
                      </li>
                    ):(
                      <li className="tools-bar-right">
                        <Link onClick={(e)=>{e.preventDefault();navigate('login');}} to={""}>
                          <img alt="login" src={user_icon} style={{width:'24px',marginRight:5}}/>Login
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
    
  );
};
