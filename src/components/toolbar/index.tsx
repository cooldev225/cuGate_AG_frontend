import "../../assets/scss/toolbar.scss";
import styled from "styled-components";
import { DefaultButton, Icon } from "../widgets";
import { SearchBar } from "./searchbar";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import moment from "moment";
import { getGenres, getMoods, getUserInfo } from "../../actions/user";
import { activityList, seasonList } from "../../views/profile/contents";

export const Toolbar: React.FC = () => {
  const Container = styled.nav``;
  const { user, dispatchUser } = useAuth() as any;
  const [info, setInfo] = useState({
    country: "Germany",
    city: "Berlin",
    time: moment().format("hh:mm a"),
    temperature: 16,
    weather: "ok",
  });
  const [genreList, setGenreList] = useState<any>([]);
  const [moodList, setMoodList] = useState<any>([]);
  const [_activityList, _setActivityList] = useState<any>([]);
  const [_seasonList, _setSeasonList] = useState<any>([]);

  const initialise = async () => {
    if (user && user.geo_info.country != null) {
      if (user.geo_info.lat === 61.52401 && user.geo_info.lon === 105.318756) {
        user.geo_info.country = "Germany";
        user.geo_info.city = "Berlin";
      }
      await setInfo({
        country: user.geo_info?.country,
        city: user.geo_info?.city,
        temperature: user.geo_info?.temperature,
        weather: user.geo_info?.weather,
        time: user.geo_info.time ? moment(user.geo_info.time).format("hh:mm a") : moment().format("hh:mm a"),
      });
    }
    if (user) {
      if (user.profile) {
        getGenres().then((data) => {
          let favorite_genres = user.profile.favorite_genres.split(',').map((m: string) => Number(m));
          let filtered_data = data.result.filter((g: any) => favorite_genres.filter((f: any) => f === g.id).length);
          setGenreList(filtered_data);
        });
        getMoods().then((data) => {
          let favorite_moods = user.profile.favorite_moods.split(',').map((m: string) => Number(m));
          let filtered_data = data.result.filter((g: any) => favorite_moods.filter((f: any) => f === g.id).length);
          setMoodList(filtered_data);
        });

        let favorite_activities = user.profile.favorite_activities.split(',');
        let filtered_data = activityList.filter((g: any) => favorite_activities.filter((f: any) => f === g.key).length);
        _setActivityList(filtered_data);

        let favorite_seasons = user.profile.favorite_seasons.split(',');
        filtered_data = seasonList.filter((g: any) => favorite_seasons.filter((f: any) => f === g.key).length);
        _setSeasonList(filtered_data);
      } else {
        await getUserInfo().then((data) => {
          dispatchUser(data.result);
        });
        // setTimeout(() => {
        //   window.location.href=location.pathname;
        // }, 200);
      }
    }
  }
  useEffect(() => {
    if (user) initialise();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Container className="d-flex w-100 px-10 toolbar">
      <div className="card-location" style={{ display: user ? "block" : "none" }}>
        <div>
          <strong>{info.city && `${info.city}, `}</strong> {info.country}
        </div>
        <div>
          {info.time.toUpperCase()} {info.temperature}°C
          <img className="mb-1 ms-2" src={
            "weather_icons/" + (
              info.weather?.toLowerCase() === "rain" ||
                info.weather?.toLowerCase() === "snow" ||
                info.weather?.toLowerCase() === "clouds" ||
                info.weather?.toLowerCase() === "wind" ?
                info.weather?.toLowerCase() : "sun"
            ) + ".png"
          } style={{ width: '20px' }} alt="" />
        </div>
      </div>
      <SearchBar />
      <div className="search-categories">
        {genreList.map((genre: any, index: number) => (
          <DefaultButton key={"genre_" + index} color="#00cbd8" className="me-2">{genre.title}<Icon name="close" color="white" /></DefaultButton>
        ))}
        {moodList.map((mood: any, index: number) => (
          <DefaultButton key={"mood_" + index} color="#00cbd8" className="me-2">{mood.title}<Icon name="close" color="white" /></DefaultButton>
        ))}
        {_activityList.map((activity: any, index: number) => (
          <DefaultButton key={"activity" + index} color="#00cbd8" className="me-2">{activity.text}<Icon name="close" color="white" /></DefaultButton>
        ))}
        {_seasonList.map((season: any, index: number) => (
          <DefaultButton key={"season" + index} color="#00cbd8" className="me-2">{season.key}<Icon name="close" color="white" /></DefaultButton>
        ))}
      </div>
    </Container>
  );
};
