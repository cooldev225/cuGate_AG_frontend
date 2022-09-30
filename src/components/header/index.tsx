import "../../assets/scss/header.scss";
import { menuList, menuRightList } from "./contents";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import icons from '../../assets/images/menu';

export const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState('cugate');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    menuList.map((value,index)=>{
      if(location.pathname.indexOf(value.url)>-1){
        setActiveItem(value.key);
        return index;
      }
    });
  }, []);
  return (
    <nav id="navbar" className="uk-navbar-container uk-navbar-transparent uk-light">
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
