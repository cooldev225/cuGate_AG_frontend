import { planList } from "./contents";
import "../../assets/scss/membership.scss";
import { DefaultButton } from "../../components/widgets";
import { useEffect, useState } from "react";
import { StoreState } from "../../types/models/store";
import { useSelector } from "react-redux";

interface planType {
    title: string;
    items: any;
};
export const CheckoutPage: React.FC = () => {
    const { page } = useSelector((state:StoreState) => state.auth);
    const plan = useState<planType>({
        title: "",
        items: [],
    });
    useEffect(()=>{
        //alert(page);
      },[page]);
    return (
        <div className="page page-membership uk-container-large mt-5">
            <h1 className="caption text-center mt-5 mb-5">CHECKOUT</h1>
            <div className="d-flex justify-content-center gap-2 mb-5">
                <div>
                    <h2>Service</h2>
                    <div
                        className={"card px-3 py-3"}
                    >
                        {/* <h4>{plan.title}</h4>
                        <ul className="mb-5">
                            {plan?.items.map((item, index)=>(
                                <li key={index} className="mb-1">{item}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    );
};