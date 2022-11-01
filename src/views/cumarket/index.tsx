import "../../assets/scss/cumarket.scss";
import img_preview from '../../assets/images/cumarket/cumarket_preview.png';
import { Inprocess } from "../../components";

export const CumarketPage: React.FC = () => {
    return (
        <div className={"page page-cumarket"}>
            <div className="tool-bar">
                <img src={img_preview} style={{width:'100%'}} alt=""/>
            </div>
            <div>
                <Inprocess/>
            </div>
        </div>
    );
};