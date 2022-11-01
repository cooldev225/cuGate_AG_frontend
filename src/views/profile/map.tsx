import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey( "AIzaSyAxZ3e38dtLruEvs5W1FZ4IBTNKa9KRrGY" );
Geocode.enableDebug();

interface PositionType {
    lat: number;
    lng: number;
};
interface Props {
    google?: string;
    center?: PositionType;
    height?: string;
    zoom: number;
};
export const Map: React.FC<Props> = (props) => {
	return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        ></GoogleMap>
    );
}
export default Map;