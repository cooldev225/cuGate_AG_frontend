import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/scss/login.scss';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { APP_API_URL, SOCIAL_KEYS } from "../../constants";
import useAuth from '../../hooks/useAuth';
import { StoreState } from '../../types/models/store';
import { useSelector } from 'react-redux';
import icons from '../../assets/images/menu';
import icon_text_content from '../../assets/images/content Unlimited.svg';
import icon_text_cugate from '../../assets/images/cugate-text.svg';
import { menuList, menuRightList } from '../../components/header/contents';
import { useEffect, useState } from 'react';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login,register,isAuthenticated } = useAuth() as any;
    const { page } = useSelector((state:StoreState) => state.auth);
    const [activeMenu, setActiveMenu] = useState(menuList[0]);

    const responseGoogle = async (response: any) => {
        //
    };

    const responseFacebook = () =>{
        //
    };

    const loginHande = () => {
        navigate(activeMenu.url);
    };

    useEffect(() => {
        menuList.map((value,index)=>{
            if(value.url.indexOf(page)>-1){
                setActiveMenu(value);
                return index;
            }
        });
        menuRightList.map((value,index)=>{
            if(value.url.indexOf(page)>-1){
                setActiveMenu(value);
                return index;
            }
        });
    });
      
    return (
        <div className={"page page-login"}>
            <div className='d-flex justify-content-center mt-5'>
                <div className='d-flex align-items-center flex-column' style={{width:'100px'}}>
                    <img alt={activeMenu?.text} src={icons[activeMenu.icon]} style={{width:'65px'}}/>
                    <img className='mt-3' alt={activeMenu?.text} src={icon_text_cugate} style={{width:'100px'}}/>
                    <img alt={activeMenu?.text} src={icon_text_content} style={{width:'100px'}}/>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Form className='mt-3'>
                    <Form.Label className="cation d-flex justify-content-center">
                        <h1>Login</h1>
                    </Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <div className="d-flex">
                            <Form.Check type="checkbox" className="me-2"/>
                            I have read and agree to the
                            <Link 
                                onClick={()=>{}}
                                className="ms-2"
                                to={"/privacy-policy"}
                            >
                                Privacy Policy
                            </Link>.
                        </div>
                    </Form.Group>
                        
                        <Button
                            variant="primary"
                            className='w-100 mb-3'
                            onClick={()=>loginHande()}
                        >
                            Login
                        </Button>
                        <Form.Label className='w-100 text-center fw-bold'>OR</Form.Label>
                        <GoogleLogin
                            clientId={SOCIAL_KEYS.GOOGLE.CLIENT_ID}
                            onSuccess={responseGoogle}
                            onFailure={(e) => console.log(["failure! > ", e])}
                        />
                        <FacebookLogin
                            appId={SOCIAL_KEYS.FACEBOOK.APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,user_friends"
                            callback={responseFacebook}
                            icon="fa-facebook"
                        />
                </Form>
            </div>
            <Link 
                    onClick={()=>{}}
                    className="w-100 d-flex justify-content-end"
                    to={"/privacy-policy"}
                >
                    register now
                </Link>
        </div>
    );
};

export default LoginPage;
    