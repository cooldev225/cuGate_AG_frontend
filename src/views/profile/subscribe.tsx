
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/scss/subscribe.scss';
import { getUserInfo, setUserInfo } from "../../actions/user";
import useAuth from '../../hooks/useAuth';
import { SetStateAction, useEffect, useState } from 'react';
import { StoreState } from '../../types/models/store';
import { FileUploader } from "react-drag-drop-files";
import { DefaultButton } from '../../components/widgets';
import { setAddress } from '../../utils/geocode';

export const SubscribePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth() as any;
    const { page } = useSelector((state:StoreState) => state.auth);
    const [activeKind, setActiveKind] = useState(-1);
    const [file, setFile] = useState(null);
    const fileTypes = ["MP3", "MP4", "AVI"];
    const [lat, setLat] = useState<number>(-1000000);
    const [long, setLong] = useState<number>(-1000000);
    const geolocationAPI = navigator.geolocation;

    const getUserCoordinates = async () => {
        if (!geolocationAPI) {
            console.log('Geolocation API is not available in your browser!')
        } else {
            geolocationAPI.getCurrentPosition(async (position) => {
            const { coords } = position;
            setLat(coords.latitude);
            setLong(coords.longitude);
            if(lat>-1000000&&long>-1000000){
                await setAddress(coords.latitude, coords.longitude);
                console.log(["getUserInfo_console subscribe setaddress"]);
                await getUserInfo().then((data) => {
                    dispatch({
                        type: "INITIALISE",
                        payload: {
                          isAuthenticated: true,
                          user: data.result,
                        },
                    });
                });
            }
          }, (error) => {
            console.log('Something went wrong getting your position!\n' + error)
          })
        }
    }
    useEffect(() => {
        if(user?.is_subscribe){
            navigate("/profile");
        }
        getUserCoordinates();
        if(activeKind === -1 && user){
            setActiveKind(user?.is_business);
        }
    },[user]);

    const submitKind = async () => {
        if(user?.is_subscribe){
            navigate("/profile");
        }else{
            navigate("/membership");
        }
        if(activeKind>-1){
            await setUserInfo({
                is_business: activeKind,
                is_subscribe: 1
            });
            console.log(["getUserInfo_console subscribe setkind"]);
            await getUserInfo().then((data) => {
                dispatch({
                    type: "INITIALISE",
                    payload: {
                      isAuthenticated: true,
                      user: data.result,
                    },
                });
            });
            dispatch({
                type: "SET_PAGE",
                payload: "subscribe-upload",
            });
        }
    };

    const submitUpload = async () => {
        // dispatch({
        //     type: "SET_PAGE",
        //     payload: "subscribe-categories",
        // });
        await setUserInfo({is_subscribe: 1});
        console.log(["getUserInfo_console subscribe issubscribe"]);
        await getUserInfo().then((data) => {
            dispatch({
                type: "INITIALISE",
                payload: {
                  isAuthenticated: true,
                  user: data.result,
                },
            });
        });
        navigate("/profile");
    };
    return (
        <div className={"page page-profile-subscribe d-flex align-items-center justify-content-center"}>
            {page === "subscribe-upload"?(
                <div className='card-upload'>
                    <FileUploader 
                        handleChange={(file: SetStateAction<null>)=>setFile(file)}
                        name="file"
                        multiple={false}
                        label="Drag your file here"
                        classes="drop_zone"
                        types={fileTypes}
                    />
                    <div className="d-flex justify-content-between button-group">
                        <Link className='mt-5' to={""} onClick={()=>submitUpload()}>
                            <h3>Skip</h3>
                        </Link>
                        <Link className={"mt-5" + (file?"":" disable")} to={""} onClick={()=>{if(file)submitUpload();}}>
                            <h3>Submit</h3>
                        </Link>
                    </div>
                </div>
            ):(
                <div className='card-kind text-center'>
                    <h2>Chose your account kind</h2>
                    <div className="d-flex justify-content-center">
                        <div className={"card focus me-5" + (activeKind?"":" active")} onClick={()=>setActiveKind(0)}>
                            <h2>Personal</h2>
                        </div>
                        <div className={"card focus" + (activeKind?" active":"")} onClick={()=>setActiveKind(1)}>
                            <h2>Business</h2>
                        </div>
                    </div>
                    <DefaultButton textColor='var(--color-orange)' onClick={submitKind}>Continue</DefaultButton>
                </div>
            )}
        </div>
    );
};