import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/scss/auth.scss';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { SOCIAL_KEYS } from "../../constants";
import useAuth from '../../hooks/useAuth';
import { StoreState } from '../../types/models/store';
import { useSelector } from 'react-redux';
import icons from '../../assets/images/menu';
import icon_text_content from '../../assets/images/content Unlimited.svg';
import icon_text_cugate from '../../assets/images/cugate-text.svg';
import icon_social_google from '../../assets/images/google.svg';
import { menuList, menuRightList } from '../../components/header/contents';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { STATUS_CODE } from "../../constants";
import { setAddress } from '../../utils/geocode';
import { Icon } from '../../components/widgets';
import { getUserInfo } from '../../actions/user';

export const AuthPage: React.FC<{page: number}> = (props) => {
    const navigate = useNavigate();
    const ourLocation = {
        lat: 52.48546014466491, 
        lon: 13.34604,
    };
    const { login, register, isAuthenticated, dispatchUser } = useAuth() as any;
    const { page } = useSelector((state:StoreState) => state.auth);
    const [activeMenu, setActiveMenu] = useState(menuList[0]);
    const [validated, setValidated] = useState(false);
    const geolocationAPI = navigator.geolocation;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confpass: "",
    });

    const getUserCoordinates = async () => {
        if (!geolocationAPI) {
            console.log('Geolocation API is not available in your browser!');
            setDefaultLocation();
        } else {
            geolocationAPI.getCurrentPosition(async (position) => {
                const { coords } = position;
                if(coords.latitude>-1000000&&coords.longitude>-1000000){
                    setAddress(coords.latitude, coords.longitude).then(async ()=>{
                        await getUserInfo().then((data) => {
                            dispatchUser(data.result);
                        });
                    }).catch((err)=>{
                        console.log(err);
                    });
                }else{
                    setDefaultLocation();
                }
            }, async (error) => {
                console.log('Something went wrong getting your position!');
                setDefaultLocation();
            })
        }
    }

    const setDefaultLocation = () => {
        setAddress(ourLocation.lat, ourLocation.lon).then(()=>{
            getUserInfo().then((data) => {
                dispatchUser(data.result);
            });
        });
    };

    const responseGoogle = (response: any) => {
        let uid = response.getBasicProfile().getId();
        let name =  response.getBasicProfile().getName();
        let pic = response.getBasicProfile().getImageUrl();
        let email = response.getBasicProfile().getEmail();
        let postData = {
          submit:'google',
          faceBookAccessToken:pic,
          facebookId:uid,
          user:name,
          email:email
        };
        loginAction(postData);
    };

    const responseFacebook = (response: any) =>{
        console.log(["facebook=",response]);
        let uid = response.getId();
        let name =  response.getName();
        let email = response.getEmail();
        let postData = {
          submit:'facebook',
          faceBookAccessToken:"accessToken",
          facebookId:uid,
          user:name,
          email:email
        };
        loginAction(postData);
    };

    const handleLoginSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
            await getUserCoordinates();
            let postData = {
                submit:'web',
                user:formData.username,
                password:formData.password,
            };
            loginAction(postData);
        }
        setValidated(true);
    };

    const handleRegisterSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        if(formData.password!==formData.confpass){
            formData.confpass = "";
            formData.username = "";
            document.getElementById("confirm_password")?.focus();
            setTimeout(() => {
                toast("Confirm password is not match!");
            }, 200);
            return;
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
            let postData = {
                submit:'web',
                user:formData.username,
                password:formData.password,
                email: formData.email,
            };
            setLoading(true);
            await register(postData).then(async (res: any)=>{
                if(res.code === STATUS_CODE.AUTH.SUCCESS_LOGIN){
                    await getUserCoordinates();
                    res.message = "Registration successful!";
                    toast(res.message);
                    // setTimeout(() => {
                    //     logout();
                    // }, 500);
                    if(res.is_subscribe===undefined||!res.is_subscribe||res.is_subscribe===0){
                        navigate("/profile/subscribe");
                    }else{
                        navigate(activeMenu.url);
                    }
                }
            });
            setLoading(false);
        }
        setValidated(true);
    };

    const loginAction = async (postData: any) => {
        setLoading(true);
        let res = await login(postData);
            if(res.code === STATUS_CODE.AUTH.SUCCESS_LOGIN){
                if(!res.is_subscribe){
                    await getUserCoordinates();
                    navigate("/profile/subscribe");
                }else{
                    navigate(activeMenu.url);
                }
                res.message = "Login successful!";
            }
            setTimeout(() => {
                toast(res.message);
            }, 500);
        setLoading(false);
    };

    useEffect(() => {
        if(isAuthenticated)navigate(activeMenu.url);
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
        <div className={"page page-auth auth-"+(props.page?"register":"login")}>
            <div className='d-flex justify-content-center mt-5'>
                <div className='d-flex align-items-center flex-column' style={{width:'100px'}}>
                    <img 
                        alt={activeMenu?.text}
                        src={icons[activeMenu.icon]}
                        style={{width:'65px',cursor:'pointer'}}
                        onClick={()=>navigate("/")}    
                    />
                    <img
                        className='mt-3'
                        alt={activeMenu?.text}
                        src={icon_text_cugate}
                        style={{width:'100px',cursor:'pointer'}}
                        onClick={()=>navigate("/")}
                    />
                    <img
                        alt={activeMenu?.text}
                        src={icon_text_content}
                        style={{width:'100px',cursor:'pointer'}}
                        onClick={()=>navigate("/")}
                    />
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                {props.page === 0?(
                <Form
                    noValidate
                    className='mt-3'
                    validated={validated}
                    onSubmit={handleLoginSubmit}
                >
                    <Form.Label className="cation d-flex justify-content-center mb-5">
                        <h1>Login</h1>
                    </Form.Label>
                    <Form.Group className="mb-4">
                        <Form.Control
                            required
                            type="text"
                            placeholder="User Name"
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
                                {loading?(
                                    <Icon name='loading'/>
                                ):(
                                    "Login"
                                )}
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
                ):(
                <Form
                    noValidate
                    className='mt-3'
                    validated={validated}
                    onSubmit={handleRegisterSubmit}
                >
                    <Form.Label className="cation d-flex justify-content-center mb-5">
                        <h1>Registration</h1>
                    </Form.Label>
                    <Form.Group className="mb-4">
                        <Form.Control
                            required
                            type="text"
                            autoComplete="off"
                            placeholder="User Name"
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
                            type="text"
                            autoComplete="off"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out e-mail.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            required
                            type="password"
                            autoComplete="off"
                            value={formData.password}
                            placeholder="Password"
                            onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            required
                            id="confirm_password"
                            type="password"
                            autoComplete="off"
                            value={formData.confpass}
                            placeholder="Confirm Password"
                            onChange={(e)=>setFormData({...formData,confpass:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out confirm password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className='d-flex flex-column'>
                        <div className='d-flex justify-content-center'>
                            <Button
                                className='w-100 mb-3 login d-flex justify-content-center'
                                type="submit"
                            >
                                {loading?(
                                    <Icon name='loading'/>
                                ):(
                                    "Registration"
                                )}
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
                        <div className='d-flex justify-content-center mb-5 gray-color register'>
                            Already have an account? 
                            <Link 
                                className='ms-2'
                                to={"/login"}
                            >
                                login
                            </Link>
                        </div>
                    </div>
                </Form>
                )}
                
            </div>
        </div>
    );
};

export default AuthPage;
    