import { planList } from "./contents";
import "../../assets/scss/membership.scss";
import { DefaultButton } from "../../components/widgets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const MembershipPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth() as any;
    const [selectPlan, setSelectPlan] =  useState("free_b2c");
    const [enterPlan, setEnterPlan] =  useState("");

    const handleCheckout = () => {
        planList.map((p)=>p.key===enterPlan&&p.price&&p.key!==selectPlan&&navigate('/checkout/'+enterPlan));
    };

    useEffect(()=>{
        if(user.profile&&user.profile.membership_level){
            planList.map((p)=>p.id===user.profile.membership_level&&setSelectPlan(p.key));
        }
    },[user]);

    return (
        <div className="page page-membership uk-container-large mt-5">
            <h1 className="caption text-center mt-5 mb-5">CHOSE YOUR PLAN</h1>
            <div className="body d-grid justify-content-center gap-2 mb-5">
                {planList.map((plan,index)=>(
                    <div
                        key={index}
                        className={"card px-3 py-3"+(plan.key===selectPlan||plan.key===enterPlan?' active':'')}
                        onMouseEnter={()=>setEnterPlan(plan.key)}
                        onMouseLeave={()=>setEnterPlan("")}
                    >
                        <h4>{plan.title}</h4>
                        <ul className="mb-5">
                            {plan.items.map((item, iindex)=>(
                                <li key={iindex} className="mb-1">{item}</li>
                            ))}
                        </ul>
                        <DefaultButton
                            disabled={plan.key===selectPlan||!plan.price}
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