import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { APP_API_URL, SOCIAL_KEYS } from "../../constants";

interface IProps{
    show: boolean;
    title: string;
    onHide?: () => void;
}
export const AuthModal: React.FC<IProps> = (props) => {

    const responseGoogle = async (response: any) => {
        //
    };

    const responseFacebook = () =>{
        //
    };
      
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-250w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                {props.title}
                or <Link 
                        onClick={props.onHide}
                        className="w-100 d-flex justify-content-end"
                        to={"/privacy-policy"}
                    >
                        register now
                    </Link>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <div className="d-flex">
                            <Form.Check type="checkbox" className="me-2"/>
                            I have read and agree to the
                            <Link 
                                onClick={props.onHide}
                                className="ms-2"
                                to={"/privacy-policy"}
                            >
                                Privacy Policy
                            </Link>.
                        </div>
                    </Form.Group>
                    
                    <Button variant="primary" className='w-100 mb-3'>Login</Button>
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
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;
    