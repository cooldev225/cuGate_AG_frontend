import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import "../../assets/scss/layout.scss";
import { useSelector } from "react-redux";
import { StoreState } from "../../types/models/store";
import BackToTop from "./BackToTop";
import WebFont from 'webfontloader';
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toolbar } from "../toolbar";
interface Props{
    children: ReactNode;
}
export const DefaultLayout: React.FC<Props> = (props) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const { mobilemenu_toggle } = useSelector((state:StoreState) => state.auth);

  function updateSize() {
    setIsMobile(window.innerWidth<1024);
  }
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(()=>{
    updateSize();
    WebFont.load({
      google: {
        families: ['Montserrat', 'Inter']
      }
    });
  },[]);
  return (
    <div className={"cugate-default-layout"+(isMobile?" mobile-size uk-text-center":"")+(mobilemenu_toggle?" offcanvas-menu":"")}>
      <Header />  
      {/* {location.pathname.indexOf('login')>-1||location.pathname.indexOf('register')>-1||location.pathname.indexOf('cugate')>-1?(
        <></>
      ):(
        <Toolbar />
      )} */}
      {props.children}
      {location.pathname.indexOf('login')>-1||location.pathname.indexOf('register')>-1?(
        <></>
      ):(
        <Footer />
      )}
      
      <BackToTop />
      <ToastContainer />
    </div>
  );
};

export default DefaultLayout;
