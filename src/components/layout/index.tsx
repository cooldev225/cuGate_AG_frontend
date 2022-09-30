import { ReactNode } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import "../../assets/scss/layout.scss";
interface Props{
    children: ReactNode;
}
export const DefaultLayout: React.FC<Props> = (props) => {
  return (
    <div className="cugate-default-layout">
      <Header />  
      {props.children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
