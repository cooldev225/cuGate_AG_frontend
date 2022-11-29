import { planList } from "./contents";
import "../../assets/scss/membership.scss";
import { DefaultButton } from "../../components/widgets";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYMENT_KEYS } from "../../constants";
import { getUserInfo, setUserInfo } from "../../actions/user";
import moment from "moment";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

export const CheckoutPage: React.FC = () => {
    const { user } = useAuth() as any;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [plan, setPlan] = useState<any>({
        title: "",
        items: [],
    });
    const [total, setTotal] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const monthsByLevel = [1,3,6,12,48];

    useEffect(()=>{
        if(user&&user.profile&&user.profile.membership_level && plan.id && user.profile.membership_level===plan.id){
            navigate('/profile');
        }
    },[user, plan]);

    useEffect(()=>{
        planList.map((p: any) => {
            if(p.key===id){
                setPlan(p);
            }
        });
    },[id]);

    useEffect(()=>{
        if(plan.price){
            if(duration===0){
                setTotal((plan.price).toFixed(2));
            }else if(duration===1){
                let v = plan.price*0.6*3;
               setTotal(Number(v.toFixed(2)));
            }else if(duration===2){
                setTotal(Number((plan.price*0.5*6).toFixed(2)));
            }else if(duration===3){
                setTotal(Number((plan.price*0.4*12).toFixed(2)));
            }else if(duration===4){
                setTotal(Number((plan.price*0.3*48).toFixed(2)));
            }
        }else{
            setTotal(0);
        }
    },[duration, plan]);

    const handleMembership = () => {
        navigate('/membership');
    };

    const handlePayment = async () => {
        let plan_id = plan.id;
        if(!plan_id){
            planList.map((p: any) => {
                plan_id = p.id;
            });
        }
        if(plan_id){
            await setUserInfo({
                is_membership: true,
                membership_level: plan_id,
                membership_expire: moment().add(monthsByLevel[duration], "months").format("YYYY-MM-DD hh:mm"),
                amount: total,
            });
            console.log(["getUserInfo_console checkout"]);
            await getUserInfo().then((data) => {
                dispatch({
                    type: "INITIALISE",
                    payload: {
                      isAuthenticated: true,
                      user: data.result,
                    },
                });
            });
            navigate('/profile');
        }
    };
    return (
        <div className="page page-membership page-checkout uk-container-large mt-5">
            <h1 className="caption text-center mt-5 mb-5">CHECKOUT</h1>
            <div className="page-box">
                <div className="box-wrapper row">
                    <div className="col-6">
                        <div className="body gap-2 mb-5">
                            <p className="card-caption">Service</p>
                            <div
                                className={"card card-plan px-3 py-3"}
                            >
                                <h4>{plan.title}</h4>
                                <ul className="mb-5">
                                    {plan?.items.map((item: any, index:number)=>(
                                        <li key={index} className="mb-4">{item}</li>
                                    ))}
                                </ul>
                                <DefaultButton onClick={handleMembership}>Select other plan</DefaultButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="body gap-2 mb-5">
                            <p className="card-caption">Select Plan Duration</p>
                            <div
                                className={"card card-duration"}
                            >
                                <div
                                    className={"card-item focus d-flex justify-content-between" + (duration===4?' active':'')}
                                    onClick={()=>setDuration(4)}
                                >
                                    <div className="d-flex align-items-center">
                                        <input
                                            type={"radio"}
                                            name="duration_op"
                                            checked={duration===4?true:false}
                                            onChange={()=>{;}}
                                        />
                                        <span>48 months</span>
                                        <span className="badge">SAVE 70%</span>
                                    </div>
                                    <div>
                                        <span className="promote">${plan.price}</span>
                                        <span>${(plan.price*0.3).toFixed(2)} / mo</span>
                                    </div>
                                </div>
                                <div
                                    className={"card-item focus d-flex justify-content-between" + (duration===3?' active':'')}
                                    onClick={()=>setDuration(3)}
                                >
                                    <div className="d-flex align-items-center">
                                        <input
                                            type={"radio"}
                                            name="duration_op"
                                            checked={duration===3?true:false}
                                            onChange={()=>{;}}
                                        />
                                        <span>12 months</span>
                                        <span className="badge">SAVE 60%</span>
                                    </div>
                                    <div>
                                        <span className="promote">${plan.price}</span>
                                        <span>${(plan.price*0.4).toFixed(2)} / mo</span>
                                    </div>
                                </div>
                                <div
                                    className={"card-item focus d-flex justify-content-between" + (duration===2?' active':'')}
                                    onClick={()=>setDuration(2)}
                                >
                                    <div className="d-flex align-items-center">
                                        <input
                                            type={"radio"}
                                            name="duration_op"
                                            checked={duration===2?true:false}
                                            onChange={()=>{;}}
                                        />
                                        <span>6 months </span>
                                        <span className="badge">SAVE 50%</span>
                                    </div>
                                    <div>
                                        <span className="promote">${plan.price}</span>
                                        <span>${(plan.price*0.5).toFixed(2)} / mo</span>
                                    </div>
                                </div>
                                <div
                                    className={"card-item focus d-flex justify-content-between" + (duration===1?' active':'')}
                                    onClick={()=>setDuration(1)}
                                >
                                    <div className="d-flex align-items-center">
                                        <input
                                            type={"radio"}
                                            name="duration_op"
                                            checked={duration===1?true:false}
                                            onChange={()=>{;}}
                                        />
                                        <span>3 months</span>
                                        <span className="badge">SAVE 40%</span>
                                    </div>
                                    <div>
                                        <span className="promote">${plan.price}</span>
                                        <span>${(plan.price*0.6).toFixed(2)} / mo</span>
                                    </div>
                                </div>
                                <div
                                    className={"card-item focus d-flex justify-content-between" + (duration===0?' active':'')}
                                    onClick={()=>setDuration(0)}
                                >
                                    <div className="d-flex align-items-center">
                                        <input
                                            type={"radio"}
                                            name="duration_op"
                                            checked={duration===0?true:false}
                                            onChange={()=>{;}}
                                        />
                                        <span>1 month</span>
                                    </div>
                                    <div>
                                        <span>${plan.price} / mo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body gap-2 mb-5">
                            <p className="card-caption">Payment</p>
                            <div
                                className={"card px-3 py-3"}
                            >
                                <PayPalScriptProvider
                                    options={{ "client-id": PAYMENT_KEYS.PAYPAL.CLIENT_ID }}
                                >
                                    <PayPalButtons  onClick={()=>handlePayment()} style={{ layout: "horizontal" }} />
                                </PayPalScriptProvider>
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};