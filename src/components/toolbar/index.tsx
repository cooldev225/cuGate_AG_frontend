import "../../assets/scss/toolbar.scss";
import styled from "styled-components";
import { DefaultButton } from "../widgets";
import icon_wclose from '../../assets/images/close.png';
import { SearchBar } from "./searchbar";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import moment from "moment";

export const Toolbar: React.FC = () => {
  const Container = styled.nav``;
  const { user } = useAuth() as any;
  const [info,setInfo] = useState({
    country: "Germany",
    city: "Berlin",
    time: moment().format("hh:mm a"),
    temperature: 16,
    weather: "ok",
  });
  useEffect(()=>{
    if(user&&user.geo_info.lat!==61.52401&&user.geo_info.lon!==105.318756){
      setInfo({
        country : user.geo_info?.country,
        city : user.geo_info?.city,
        temperature: user.geo_info?.temperature,
        weather: user.geo_info?.weather,
        time: user.geo_info.time?moment(user.geo_info.time).format("hh:mm a"):moment().format("hh:mm a"),
      });
    }
  },[user]);
  return (
    <Container className="d-flex w-100 px-10 toolbar">
      <div className="card-location" style={{display:user?"block":"none"}}>
        <div>
          <strong>{info.city},</strong> {info.country}
        </div>
        <div>
          {info.time.toUpperCase()} {info.temperature}°C
          <img className="mb-1 ms-2" src={
            "weather_icons/" + (
              info.weather?.toLowerCase()==="rain"||
              info.weather?.toLowerCase()==="snow"||
              info.weather?.toLowerCase()==="clouds"||
              info.weather?.toLowerCase()==="wind"?
              info.weather?.toLowerCase():"sun"
            ) + ".png"
          } style={{width:'20px'}} alt=""/>
        </div>
      </div>
      <SearchBar/>
      <div className="search-categories">
        <DefaultButton color="#00cbd8" className="me-2">Classical<img src={icon_wclose} alt=""/></DefaultButton>
        <DefaultButton color="#00cbd8" className="me-2">Dance<img src={icon_wclose} alt=""/></DefaultButton>
        <DefaultButton color="#00cbd8" className="me-2">Pop<img src={icon_wclose} alt=""/></DefaultButton>
      </div>
    </Container>
  );
};
