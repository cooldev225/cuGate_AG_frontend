import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import "../../assets/scss/layout.scss";
import { useSelector } from "react-redux";
import { StoreState } from "../../types/models/store";
interface Props{
    children: ReactNode;
}
export const DefaultLayout: React.FC<Props> = (props) => {
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
  },[]);
  return (
    <div className={"cugate-default-layout"+(isMobile?" mobile-size uk-text-center":"")+(mobilemenu_toggle?" offcanvas-menu":"")}>
      <Header />  
      {props.children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
