export interface UserProfile {
  favorite_genres: string,
  favorite_moods: string,
  favorite_activities: string,
  favorite_seasons: string,
  [key: string]: any;
}

export interface UserGeoInfo {
  lat: number;
  lon: number;
  [key: string]: any;
}

export interface User {
  account: string;
  email: string;
  profile: UserProfile;
  geo_info: UserGeoInfo;
  [key: string]: any;
}
