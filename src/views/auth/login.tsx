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
import { useDispatch, useSelector } from 'react-redux';
import icons from '../../assets/images/menu';
import icon_text_content from '../../assets/images/content Unlimited.svg';
import icon_text_cugate from '../../assets/images/cugate-text.svg';
import icon_social_google from '../../assets/images/google.svg';
import icon_social_twitter from '../../assets/images/twitter.svg';
import icon_social_facebook from '../../assets/images/facebook.svg';
import { menuList, menuRightList } from '../../components/header/contents';
import { useEffect, useState } from 'react';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login,register,isAuthenticated } = useAuth() as any;
    const { page } = useSelector((state:StoreState) => state.auth);
    const [activeMenu, setActiveMenu] = useState(menuList[0]);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const responseGoogle = async (response: any) => {
        //
    };

    const responseFacebook = () =>{
        //
    };

    const handleSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            await login({
                submit:'web',
                user:formData.username,
                password:formData.password,
            }).then((res: any)=>{
                alert(res);
                if(res){
                    navigate(activeMenu.url);
                }
            });
        }
        setValidated(true);
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
                <Form noValidate className='mt-3' validated={validated} onSubmit={handleSubmit}>
                    <Form.Label className="cation d-flex justify-content-center mb-5">
                        <h1>Login</h1>
                    </Form.Label>
                    <Form.Group className="mb-4">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e)=>setFormData({...formData,username:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out user name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Control
                            required
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className='d-flex flex-column'>
                        <div className='d-flex justify-content-center'>
                            <Button
                                className='w-100 mb-3 login d-flex justify-content-center'
                                type="submit"
                            >
                                Login
                            </Button>
                        </div>
                        <Form.Label className='d-flex justify-content-center mt-5 mb-5 gray-color'>Or Sign Up Using</Form.Label>
                        <div className='d-flex justify-content-center social-buttons mb-5'>
                            <GoogleLogin
                                className='me-4'
                                clientId={SOCIAL_KEYS.GOOGLE.CLIENT_ID}
                                onSuccess={responseGoogle}
                                onFailure={(e) => console.log(["failure! > ", e])}
                                render={(renderProps) => (
                                    <img 
                                    className='me-2'
                                    role="button"
                                    src={icon_social_google}
                                    onClick={renderProps.onClick}
                                    alt="google login"
                                    />
                                )}
                            />
                            <FacebookLogin
                                appId={SOCIAL_KEYS.FACEBOOK.APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="public_profile,user_friends"
                                callback={responseFacebook}
                                icon="fa-facebook"
                            />
                        </div>
                        <div className='d-flex justify-content-center mb-3 gray-color'>
                            <Link 
                                className='me-2'
                                onClick={()=>{}}
                                to={""}
                            >
                                Forgot Password
                            </Link>
                            |
                            <Link 
                                className='ms-2'
                                onClick={()=>navigate(activeMenu.url)}
                                to={""}
                            >
                                Forgot Username
                            </Link>
                        </div>
                        <div className='d-flex justify-content-center mb-5 register'>
                            <Link 
                                to={"/register"}
                            >
                                Registration
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
    