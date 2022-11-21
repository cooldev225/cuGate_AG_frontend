import "../../assets/scss/header.scss";
import { menuList, menuRightList, menuUserList } from "./contents";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import icons from '../../assets/images/menu';
import user_icon from '../../assets/images/user.svg';
import alam_icon from '../../assets/images/alam.svg';
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('cugate');
  const [noMenu, setNoMenu] = useState(true);
  const { logout, isAuthenticated, user } = useAuth() as any;
  const [userMenuToggle, setUserMenuToggle] = useState(false);

  useEffect(() => {
    setNoMenu(false);
    if(location.pathname.indexOf('login')>-1||location.pathname.indexOf('register')>-1){
      setNoMenu(true);
    }
    menuList.map((value,index)=>{
      if(location.pathname.indexOf(value.url)>-1){
        setActiveItem(value.key);
        return index;
      }
    });
    menuRightList.map((value,index)=>{
      if(location.pathname.indexOf(value.url)>-1){
        setActiveItem(value.key);
        return index;
      }
    });
    if(location.pathname.indexOf('checkout')===-1&&location.pathname.indexOf('membership')===-1){
      dispatch({
        type: "SET_PAGE",
        payload: activeItem,
      });
    }
  }, [location.pathname]);

  return (
    <Fragment>
      <nav 
        id="navbar"
        className={"uk-navbar-container uk-navbar-transparent uk-light" + (noMenu?" noMenu":"")}
        onMouseLeave={()=>setTimeout(() => {
          setUserMenuToggle(false);
        }, 500)}
      >
        <div className="uk-background-secondary">
          <div className="uk-container uk-container-large force-stratch-width">
            <div className="uk-navbar">
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav uk-text-large hidden-smaller-width">
                  {
                    menuList.map((value,index)=>(
                      <li key={index} className={activeItem===value.key?"uk-active":""} onClick={()=>setActiveItem(value.key)}>
                        <Link onClick={(e)=>{e.preventDefault();navigate(value.url);}} to={""}>
                          <img alt={value.text} src={icons[value.icon]} style={{width:'32px'}}/>
                          <span className="uk-margin-smaller-left uk-visible@m"> 
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
                      <li key={index} className={"hidden-small-width "+(activeItem===value.key?"uk-active":"")} onClick={()=>setActiveItem(value.key)}>
                        <Link onClick={(e)=>{e.preventDefault();navigate(value.url);}} to={""}>
                          {value.text}
                        </Link>
                      </li>
                    ))
                  }
                  {
                    isAuthenticated?(
                      <li className="ms-2 d-flex tools-bar-right">
                        <img alt="alam" className="focus me-2" src={alam_icon} style={{width:'24px'}}/>
                        <img 
                          onClick={()=>setUserMenuToggle(!userMenuToggle)}
                          alt="user"
                          className="focus"
                          src={user_icon}
                          style={{width:'24px'}}
                        />
                        <ul 
                          onMouseLeave={()=>setTimeout(() => {
                            setUserMenuToggle(false);
                          }, 500)}
                          className={"user-menu-toggle" + (userMenuToggle?" show":"")}
                        >
                          {menuUserList.map((item, index)=>(
                            item.key==="divider"?(
                              <li key={index} className={item.key}></li>
                            ):item.key==="logout"?(
                              <li key={index} onClick={()=>setUserMenuToggle(false)}>
                                <Link to={""} onClick={()=>logout()}>
                                  {item.text}
                                </Link>
                              </li>
                            ):(
                              <li
                                className={"mb-1" + ("/"+item.key === location.pathname? " active":"")}
                                key={index}
                                onClick={()=>setUserMenuToggle(false)}
                              >
                                <Link to={"" + item.url}>
                                  {item.text}
                                </Link>
                              </li>
                            )
                          ))}
                        </ul>
                      </li>
                    ):(
                      <li className="ms-2 tools-bar-right">
                        <Link onClick={(e)=>{e.preventDefault();navigate('login');}} to={""}>
                          <img alt="logout" src={user_icon} style={{width:'24px',marginRight:5}}/>Login
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
      {isAuthenticated?(
        <div >
          
        </div>
      ):(<></>)}
    </Fragment>
    
  );
};
