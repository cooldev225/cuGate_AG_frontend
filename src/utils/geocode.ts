import { GOOGLE_MAP_KEY } from "../constants";
import Geocode from "react-geocode";

export async function setAddress(lat: number, lng: number) {
  Geocode.setApiKey(GOOGLE_MAP_KEY);
  Geocode.setLanguage("en");
  Geocode.fromLatLng(lat.toString(), lng.toString()).then(
    async (response) => {
      let data = {
        is_profile: true,
        register_latitude: response.results[0].geometry.location.lat,
        register_longitude: response.results[0].geometry.location.lng,
        address: response.results[0].formatted_address,
        country: "",
        country_code: "",
        state: "",
        city: "",
        postal_code: "",
      };
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              data.city = response.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              data.state = response.results[0].address_components[i].long_name;
              break;
            case "country":
              data.country = response.results[0].address_components[i].long_name;
              data.country_code = response.results[0].address_components[i].short_name;
              break;
            case "postal_code":
              data.postal_code = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }
    },
    (error) => {
      console.error(error);
    }
  );
}