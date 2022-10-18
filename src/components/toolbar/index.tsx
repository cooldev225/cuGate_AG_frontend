import "../../assets/scss/toolbar.scss";
import styled from "styled-components";
import { Button } from "../widgets";
import icon_weather_01 from '../../assets/images/weather-01.png';
import icon_wclose from '../../assets/images/close.png';
import { SearchBar } from "./searchbar";

export const Toolbar: React.FC = () => {
  const Container = styled.nav``;
  return (
    <Container className="d-flex w-100 px-10 toolbar">
      <div className="card-location">
        <div>
          <strong>Berlin,</strong> Germany
        </div>
        <div>
          09:35 AM 16°C
          <img className="mb-2 ms-2" src={icon_weather_01} style={{width:'20px'}} alt=""/>
        </div>
      </div>
      <SearchBar/>
      <div className="search-categories">
      <Button className="me-2">Classical<img src={icon_wclose} alt=""/></Button>
      <Button className="me-2">Dance<img src={icon_wclose} alt=""/></Button>
      <Button className="me-2">Pop<img src={icon_wclose} alt=""/></Button>
      </div>
    </Container>
  );
};
