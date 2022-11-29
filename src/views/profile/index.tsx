import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/scss/profile.scss";
import { activityList, seasonList, menuList } from "./contents";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { AutoComplete, DefaultButton, SearchInput } from "../../components/widgets";
////import MapPicker from 'react-google-map-picker';
import GoogleMapReact from 'google-map-react';
import { getGenres, getMoods, getUserInfo } from "../../actions/user";
import { GOOGLE_MAP_KEY } from "../../constants";
import { setAddress } from "../../utils/geocode";
import Geocode from "react-geocode";
import { setUserInfo } from "../../actions/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { planList } from "../membership/contents";

interface genreType {
    id: number;
    title: string;
    parent_id: number;
    level: number;
};
interface moodType {
    id: number;
    title: string;
};
interface formDataFavoritesType {
    genre: any[];
    mood: number[];
    activity: string[];
    season: string[];
};
interface formDataType {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    company_name: string;
    contactor_number: string;
    mobile_number: string;
    country: string;
    address: string;
    favorites:formDataFavoritesType;
    current_password: string;
    new_password: string;
    confirm_password: string;
};
interface markerType {
    lat: number;
    lng: number;
};
export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth() as any;
    const [active, setActive] = useState(menuList[0].key);
    const [genreList, setGenreList] = useState<genreType[]>([]);
    const [moodList, setMoodList] = useState<moodType[]>([]);
    const [showMap, setShowMap] = useState(false);
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const Marker = (props:markerType) => <div>
        <svg style={{marginLeft:'-18px',marginTop:'-50px'}} width="36px" height="36px" viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>map-marker</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Vivid.JS" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">
                    <g id="Icons" transform="translate(37.000000, 169.000000)">
                        <g id="map-marker" transform="translate(78.000000, 468.000000)">
                            <g transform="translate(10.000000, 6.000000)">
                                <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="red"></path>
                                <circle id="Oval" fill="#0C0058" fillRule="nonzero" cx="14" cy="14" r="7"></circle>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </div>;
    const [formData, setFormData] = useState<formDataType>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        company_name: "",
        contactor_number: "",
        mobile_number: "",
        country: "",
        address: "",
        favorites: {
            genre: [],
            mood: [],
            activity: [],
            season: [],
        },
        current_password:"",
        new_password:"",
        confirm_password:"",
    });
    const [location, setLocation] = useState({lat: 52.5200, lng: 13.4050});
    const [zoom, setZoom] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchGenre, setSearchGenre] = useState("");
      
    useEffect(()=>{
        setTimeout(() => {
            setShowMap(true);
        }, 1000);
        if(user&&user.profile){
            formData.first_name = user.profile.first_name?user.profile.first_name:"";
            formData.last_name = user.profile.last_name?user.profile.last_name:"";
            formData.username = user.account;
            formData.email = user.email;
            formData.mobile_number = user.tel?user.tel:"";
            formData.company_name = user.company?user.company:"";
            formData.contactor_number = user.profile.business_number?user.profile.business_number:"";
            setLocation({lat:user.geo_info.lat, lng:user.geo_info.lon});
            setZoom(10);
            formData.country = user.geo_info.country;
            formData.address = user.geo_info.address;

            getGenres().then((data) => {
                setGenreList(data.result);
                if(user.profile.favorite_genres!==""){
                    let favorites = formData.favorites;
                    favorites.genre = user.profile.favorite_genres.split(',').map((m:string)=>Number(m));
                    setFormData({...formData,favorites:favorites});
                }
            });

            getMoods().then((data) => {
                setMoodList(data.result);
                if(user.profile.favorite_moods!==""){
                    let favorites = formData.favorites;
                    favorites.mood = user.profile.favorite_moods.split(',').map((m:string)=>Number(m));
                    setFormData({...formData,favorites:favorites});
                }
            });

            let favorites = formData.favorites;
            if(user.profile.favorite_activities!==""){
                favorites.activity = user.profile.favorite_activities.split(',');
            }
            if(user.profile.favorite_seasons!==""){
                favorites.season = user.profile.favorite_seasons.split(',');
            }
            setFormData({...formData,favorites:favorites});
        }
    }, [user]);
    useEffect(()=>{
        let list = genreList.filter((g)=>g.id.toString()==searchGenre);
        if(list.length)handleGenre(list[0].id);
    },[searchGenre]);

    const handlePersonalInformationSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }else{
            setLoading(true);
            await setUserInfo({
                is_profile: true,
                first_name: formData.first_name,
                last_name: formData.last_name,
                business_number: formData.contactor_number,
            });
            await setUserInfo({
                name: formData.first_name + (formData.last_name===''?'':' ') + formData.last_name,
                email: formData.email,
                company: formData.company_name,
                tel: formData.mobile_number,            
            });
            console.log(["getUserInfo_console profile 01"]);
            await getUserInfo().then((data) => {
                console.log(["getUserInfo_console profile 01 dispatch", data.result]);
                dispatch({
                    type: "INITIsssALISE",
                    payload: {
                      isAuthenticated: true,
                      user: data.result,
                    },
                });
                setLoading(false);
            });
            setTimeout(() => {
                toast("successful saved!");
            }, 200);
        }
    };

    const handleFavoritesSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        event.preventDefault();
        await setUserInfo({
            is_profile: true,
            favorite_genres: formData.favorites.genre,
            favorite_moods: formData.favorites.mood,
            favorite_activities: formData.favorites.activity,
            favorite_seasons: formData.favorites.season,
        });
    };

    const handleGenre = (genre: number) => {
        let list = [];
        formData.favorites.genre.forEach((g)=>{
            if(genre !== g) list.push(g);
        });
        if(!formData.favorites.genre.filter((g)=>g===genre).length){
            list.push(genre);
        }
        let favorites = formData.favorites;
        favorites.genre = list;
        setFormData({...formData,favorites:favorites});
    };

    const handleMood = (mood: number) => {
        let list = [];
        formData.favorites.mood.forEach((g)=>{
            if(mood !== g) list.push(g);
        });
        if(!formData.favorites.mood.filter((g)=>g===mood).length){
            list.push(mood);
        }
        let favorites = formData.favorites;
        favorites.mood = list;
        setFormData({...formData,favorites:favorites});
    };

    const handleActivity = (activity: any) => {
        let list = [];
        formData.favorites.activity.forEach((g)=>{
            if(activity !== g) list.push(g);
        });
        if(!formData.favorites.activity.filter((g)=>g===activity).length){
            list.push(activity);
        }
        let favorites = formData.favorites;
        favorites.activity = list;
        setFormData({...formData,favorites:favorites});
    };

    const handleSeason = (season: any) => {
        let list = [];
        formData.favorites.season.forEach((g)=>{
            if(season !== g) list.push(g);
        });
        if(!formData.favorites.season.filter((g)=>g===season).length){
            list.push(season);
        }
        let favorites = formData.favorites;
        favorites.season = list;
        setFormData({...formData,favorites:favorites});
    };

    const setLocationAction = async (e: GoogleMapReact.ClickEventValue) => {
        Geocode.setApiKey(GOOGLE_MAP_KEY);
        Geocode.setLanguage("en");
        Geocode.fromLatLng(e.lat.toString(), e.lng.toString()).then(
            (response) => {
                let country = "", address = response.results[0].formatted_address;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "country":
                                country = response.results[0].address_components[i].long_name;
                                break;
                        }
                    }
                }
                setFormData({...formData,country:country,address: address});
                setLocation({
                    lat:response.results[0].geometry.location.lat,
                    lng:response.results[0].geometry.location.lng
                });
            },
            (error) => {
                console.error(error);
            }
        );
        await setAddress(e.lat,e.lng);
        console.log(["getUserInfo_console profile 02"]);
        await getUserInfo().then((data) => {
            dispatch({
                type: "INITIALISE",
                payload: {
                  isAuthenticated: true,
                  user: data.result,
                },
            });
        });
    };

    const handlePassword = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }else{
            if(formData.new_password!==formData.confirm_password){
                setTimeout(() => {
                    toast("No match new password and confirm password!");
                }, 200);
                formData.new_password="";
                formData.confirm_password="";
                setFormData({
                    ...formData,
                    new_password:"",
                    confirm_password:"",
                });
                return;
            }
            setLoading(true);
            await setUserInfo({
                is_password: true,
                password: formData.new_password,
            }).then((data)=>{
                if(data.result.code===-20000){
                    setTimeout(() => {
                        toast(data.result.message);
                    }, 200);
                    setFormData({
                        ...formData,
                        new_password:"",
                        confirm_password:"",
                    });
                }else{
                    setTimeout(() => {
                        toast("successful saved!");
                    }, 200);
                }
            });
            setLoading(false);
        }
    };

    const handleMembership = () => {
        navigate("/membership");
    };
    return (
        <div className="page page-profile uk-container-large mt-5 row">
            <div className="col-3 left-menu">
                <ul>
                    {menuList.map((menu, index)=>(
                        <li
                            key={index}
                            className={"mb-1 " + (menu.key === active?"active":"")}
                            onClick={()=>setActive(menu.key)}
                        >
                            <Link to={""}>{menu.text}</Link>
                        </li>    
                    ))}
                </ul>
            </div>
            <div className="col-9 content-wrapper">
            {active===menuList[0].key?(
                <Form
                    noValidate
                    className='mt-3'
                    validated={validated}
                    onSubmit={handlePersonalInformationSubmit}
                >
                    <Form.Label className="d-flex justify-content-left mb-2">
                        <h3>General</h3>
                    </Form.Label>
                    <div className="row mb-4">
                        <Form.Group className="col-6">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formData.first_name}
                                onChange={(e)=>setFormData({...formData,first_name:e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please fill out first name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="col-6">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formData.last_name}
                                onChange={(e)=>setFormData({...formData,last_name:e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please fill out last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="row mb-4">
                        <Form.Group className="col-6">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                disabled
                                type="text"
                                value={formData.username}
                                onChange={(e)=>setFormData({...formData,username:e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please fill out user name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="col-6">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please fill out email.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    {user.is_business?(
                        <div className="row mb-4">
                            <Form.Group className="col-6">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={formData.company_name}
                                    onChange={(e)=>setFormData({...formData,company_name:e.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill out company name.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-6">
                                <Form.Label>Contactor Number</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={formData.contactor_number}
                                    onChange={(e)=>setFormData({...formData,contactor_number:e.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill out contactor number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    ):(
                        <></>
                    )}

                    <div className="row mb-4">
                        <Form.Group className="col-6">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formData.mobile_number}
                                onChange={(e)=>setFormData({...formData,mobile_number:e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please fill out mobile number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <DefaultButton type="submit" loading={loading}>Save</DefaultButton>
                    </div>

                    <Form.Label className="d-flex justify-content-left mb-2">
                        <h3>Location</h3>
                    </Form.Label>

                    <div className="row mb-4">
                        <Form.Group className="col-6">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                disabled
                                type="text"
                                value={formData.country}
                            />
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                disabled
                                type="text"
                                value={formData.address}
                            />
                        </Form.Group>
                    </div>

                    <div className="row mb-4">
                        <Form.Group className="col-6">
                            <Form.Label>Latitute</Form.Label>
                            <Form.Control
                                required
                                disabled
                                type="text"
                                value={location.lat}
                            />
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label>Longitute</Form.Label>
                            <Form.Control
                                required
                                disabled
                                type="text"
                                value={location.lng}
                            />
                        </Form.Group>
                    </div>

                    {/* <MapPicker
                        className="mb-5"
                        defaultLocation={{
                            lat: 10,
                            lng: 77
                          }}
                        //zoom={zoom}
                        style={{height:'700px'}}
                        onChangeLocation={handleChangeLocation} 
                        onChangeZoom={handleChangeZoom}
                        apiKey='AIzaSyAxZ3e38dtLruEvs5W1FZ4IBTNKa9KRrGY'
                        //apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
                    /> */}

                    {showMap&&(
                        <div className="mb-5" style={{ height: '350px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
                                center={location}
                                defaultCenter={location}
                                zoom={zoom}
                                onClick={(e)=>setLocationAction(e)}
                                >
                                <Marker
                                    lat={location.lat}
                                    lng={location.lng}
                                />
                            </GoogleMapReact>
                        </div>
                    )}
                    
                </Form>
            ):active===menuList[1].key?(
                <Form
                    noValidate
                    className='mt-3'
                    onSubmit={handleFavoritesSubmit}
                >
                    <Form.Label key={1} className="d-flex justify-content-left mb-2">
                        <h3>Genres</h3>
                    </Form.Label>
                    <div className="mb-4 d-flex flex-wrap">
                        {genreList.map((genre)=>(
                            formData.favorites.genre.filter((g)=>g===genre.id).length?(
                                <DefaultButton
                                    color="var(--color-blue-light)"
                                    textColor="white"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={genre.id}
                                    onClick={()=>handleGenre(genre.id)}
                                >
                                    {genre.title}
                                </DefaultButton>
                            ):genre.level === 1?(
                                <DefaultButton
                                    color="white"
                                    textColor="var(--color-blue-light)"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={genre.id}
                                    onClick={()=>handleGenre(genre.id)}
                                >
                                    {genre.title}
                                </DefaultButton>
                            ):(
                                <></>
                            )
                        ))}
                        {formData.favorites.genre.filter((g)=>
                            genreList.filter((_g)=>g===_g.id&&_g.level===1).length
                        ).length>0&&(
                        <AutoComplete 
                            items={genreList.filter((g)=>{
                                if(g.level===2){
                                    let parents = genreList.filter(
                                        (_g)=>_g.level===1&&
                                        formData.favorites.genre.filter((__g)=>__g===_g.id).length
                                    );
                                    if(parents.length&&parents.filter((p)=>p.id===g.parent_id).length>0){
                                        return true;
                                    }
                                }
                                return false;
                            })}
                            itemKeyProperty={"id"}
                            itemLabelProperty={"title"}
                            value={searchGenre}
                            onChange={setSearchGenre}
                            width="200px"
                            borderColor="var(--color-blue-light)"
                        />
                        )}
                    </div>

                    <Form.Label key={2} className="d-flex justify-content-left mb-2">
                        <h3>Mood</h3>
                    </Form.Label>
                    <div className="mb-4">
                        {moodList.map((mood)=>(
                            formData.favorites.mood.filter((g)=>g===mood.id).length?(
                                <DefaultButton
                                    color="var(--color-blue-light)"
                                    textColor="white"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={mood.id}
                                    onClick={()=>handleMood(mood.id)}
                                >
                                    {mood.title}
                                </DefaultButton>
                            ):(
                                <DefaultButton
                                    color="white"
                                    textColor="var(--color-blue-light)"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={mood.id}
                                    onClick={()=>handleMood(mood.id)}
                                >
                                    {mood.title}
                                </DefaultButton>
                            )
                        ))}
                    </div>

                    <Form.Label key={3} className="d-flex justify-content-left mb-2">
                        <h3>Activity</h3>
                    </Form.Label>
                    <div className="mb-4">
                        {activityList.map((activity, index)=>(
                            formData.favorites.activity.filter((g)=>g===activity.key).length?(
                                <DefaultButton
                                    color="var(--color-blue-light)"
                                    textColor="white"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={index}
                                    onClick={()=>handleActivity(activity.key)}
                                >
                                    {activity.text}
                                </DefaultButton>
                            ):(
                                <DefaultButton
                                    color="white"
                                    textColor="var(--color-blue-light)"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={index}
                                    onClick={()=>handleActivity(activity.key)}
                                >
                                    {activity.text}
                                </DefaultButton>
                            )
                        ))}
                    </div>

                    <Form.Label key={4} className="d-flex justify-content-left mb-2">
                        <h3>Season</h3>
                    </Form.Label>
                    <div className="mb-4">
                        {seasonList.map((season, index)=>(
                            formData.favorites.season.filter((g)=>g===season.key).length?(
                                <DefaultButton
                                    color="var(--color-blue-light)"
                                    textColor="white"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={index}
                                    onClick={()=>handleSeason(season.key)}
                                >
                                    {season.text}
                                </DefaultButton>
                            ):(
                                <DefaultButton
                                    color="white"
                                    textColor="var(--color-blue-light)"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3"
                                    key={index}
                                    onClick={()=>handleSeason(season.key)}
                                >
                                    {season.text}
                                </DefaultButton>
                            )
                        ))}
                    </div>

                    <div className='d-flex justify-content-end mb-5'>
                        <DefaultButton type="submit">Save</DefaultButton>
                    </div>
                </Form>
            ):active===menuList[2].key?(//password
            <Form
                noValidate
                className='mt-3'
                validated={validated}
                onSubmit={handlePassword}
            >
                <div className="row mb-4">
                    <Form.Group className="col-12 mb-4">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={formData.current_password}
                            onChange={(e)=>setFormData({...formData,current_password:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out current password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="col-12 mb-4">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={formData.new_password}
                            onChange={(e)=>setFormData({...formData,new_password:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out new password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="col-12">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={formData.confirm_password}
                            onChange={(e)=>setFormData({...formData,confirm_password:e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please fill out confirm password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className='d-flex justify-content-end'>
                    <DefaultButton type="submit" loading={loading}>Save</DefaultButton>
                </div>
            </Form>
            ):active===menuList[3].key?(//notifications
                <div>
                    There is no data.
                </div>
            ):active===menuList[4].key?(//membership
                <div>
                    <p style={{color:'var(--color-blue-medium)'}}>
                        Your plan is <span style={{color:'var(--color-blue-dark)'}}>{planList[user.profile.membership_level?user.profile.membership_level:0].title}</span>
                        <span className="ms-2">Expire on </span>
                        {user.profile.membership_expire&&(<span style={{color:'var(--color-blue-dark)'}}>{moment(user.profile.membership_expire).format("DD/MM/YYYY")}</span>)}
                    </p>
                    {user.profile.membership_level<planList.length-1&&(<DefaultButton onClick={handleMembership}>Upgrade your plan</DefaultButton>)}
                </div>
            ):(
                <></>
            )}
            </div>
        </div>
    );
};