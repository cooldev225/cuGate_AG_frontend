import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/scss/footer.scss";
import { menuRightList } from "../header/contents";

export const Footer: React.FC = () => {
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const goPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,u: string) => {
    e.preventDefault();
    navigate(u);
    window.scrollTo(0, 0);
  }
  return (
    <footer className="uk-section uk-section-small uk-section-secondary">
      <div className="uk-container uk-container-large">
        <div className="uk-grid uk-child-width-1-4@m" uk-grid="">
          <div className="uk-first-column">
            © 2010 - 2022 Cugate Ltd.
          </div>
          <div className="">
            <ul className="uk-list">
              <li><a href="/#service-digital-distribution" uk-scroll="offset: 107">DIGITAL DISTRIBUTION</a></li>
              <li><a href="/#service-radio-monitoring" uk-scroll="offset: 107">RADIO MONITORING</a></li>
              <li><a href="/#service-sync-licensing" uk-scroll="offset: 107">SYNC LICENSING</a></li>
              <li><a href="/#service-cuspace" uk-scroll="offset: 107">CUSPACE</a></li>
              <li><a href="/#service-blockchain" uk-scroll="offset: 107">BLOCKCHAIN / NFT</a></li>
            </ul>
          </div>
          <div className="">
            <ul className="uk-list">
              {
                menuRightList.map((value,index)=>(
                  <li key={index} className={activeItem===value.key?"uk-active":""} onClick={()=>setActiveItem(value.key)}>
                    <Link onClick={(e)=>goPage(e,value.url)} to={""}>
                      {value.text}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="">
            Social Links
          </div>
        </div>
      </div>
    </footer>
  );
};
