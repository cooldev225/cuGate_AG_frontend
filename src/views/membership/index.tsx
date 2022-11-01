import { planList } from "./contents";
import "../../assets/scss/membership.scss";
import { DefaultButton } from "../../components/widgets";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MembershipPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectPlan, setSelectPlan] =  useState("free_b2c");
    const handleCheckout = () => {
        dispatch({
            type: "SET_PAGE",
            payload: "checkout/"+selectPlan,
        });
        navigate('/checkout');
    };
    return (
        <div className="page page-membership uk-container-large mt-5">
            <h1 className="caption text-center mt-5 mb-5">CHOSE YOUR PLAN</h1>
            <div className="body d-grid justify-content-center gap-2 mb-5">
                {planList.map((plan,index)=>(
                    <div
                        key={index}
                        className={"card px-3 py-3"+(plan.key==='free_b2c'?' active':'')}
                        onMouseEnter={()=>setSelectPlan(plan.key)}
                    >
                        <h4>{plan.title}</h4>
                        <ul className="mb-5">
                            {plan.items.map((item, iindex)=>(
                                <li key={iindex} className="mb-1">{item}</li>
                            ))}
                        </ul>
                        <DefaultButton
                            disabled={plan.key==='free_b2c'}
                            onClick={handleCheckout}
                        >
                            {plan.button}
                        </DefaultButton>
                    </div>
                ))}
            </div>
        </div>
    );
};