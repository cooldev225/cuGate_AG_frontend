import React, { useEffect, useState } from "react";
import { getFilterStations, getGenres, getMoods } from "../../actions/user";
import useAuth from "../../hooks/useAuth";
import { regionList } from "../../views/dashboard/contents";
import { activityList, seasonList } from "../../views/profile/contents";
import { AutoComplete, DefaultButton, Icon, Select } from "../widgets";
export const SearchSide: React.FC<any> = (props) => {
    const {
        _genre = [],
        _mood = [],
        _activity = [],
        _season = [],
        _region = "",
        _station = [],
        loading = false,
        searchGenre = null,
        searchStation = "",
        genreList = [],
        moodList = [],
        stationList = []
    } = props.data;

    return (
        <fieldset className="box-common search-form">
            <div className="mb-4">
                <p className="h5">Genre</p>
                <div className="">
                    {_genre.map((genre: any) => (
                        <DefaultButton
                            color="var(--color-blue-light)"
                            textColor="white"
                            borderColor="var(--color-blue-light)"
                            className="mb-3 me-3 small-button"
                            disabled={loading !== ""}
                            key={"genre_" + genre}
                        >
                            {genreList.filter((g: any) => g.id === genre)[0].title}
                            <span
                                onClick={() => props.data.handleGenre(genre)}
                            >
                                <Icon
                                    name="close"
                                    color="white"
                                />
                            </span>
                        </DefaultButton>
                    ))}
                    <AutoComplete
                        width={"100%"}
                        items={genreList}
                        itemKeyProperty={"id"}
                        itemLabelProperty={"title"}
                        value={searchGenre}
                        onChange={(item) => { props.data.setSearchGenre(item) }}
                        disabled={loading !== ""}
                        borderColor="var(--color-blue-light)"
                    />
                </div>
            </div>
            <div className="mb-4">
                <p className="h5">Mood</p>
                <div className="">
                    {moodList.map((mood: any) => (
                        _mood.filter((g: any) => g === mood.id).length ? (
                            <DefaultButton
                                color="var(--color-blue-light)"
                                textColor="white"
                                borderColor="var(--color-blue-light)"
                                className="mb-3 me-3 small-button"
                                disabled={loading !== ""}
                                key={mood.id}
                                onClick={() => props.data.handleMood(mood.id)}
                            >
                                {mood.title}
                            </DefaultButton>
                        ) : (
                            <DefaultButton
                                color="white"
                                textColor="var(--color-blue-light)"
                                borderColor="var(--color-blue-light)"
                                className="mb-3 me-3 small-button"
                                disabled={loading !== ""}
                                key={mood.id}
                                onClick={() => props.data.handleMood(mood.id)}
                            >
                                {mood.title}
                            </DefaultButton>
                        )
                    ))}
                </div>
            </div>
            {/* <div className="mb-4">
            <p className="h5">Activity</p>
            <div className="">
                {activityList.map((activity, index)=>(
                    _activity.filter((g:any)=>g===activity.key).length?(
                        <DefaultButton
                            color="var(--color-blue-light)"
                            textColor="white"
                            borderColor="var(--color-blue-light)"
                            className="mb-3 me-3 small-button"
                            disabled={loading!==""}
                            key={index}
                            onClick={()=>props.data.handleActivity(activity.key)}
                        >
                            {activity.text}
                        </DefaultButton>
                    ):(
                        <DefaultButton
                            color="white"
                            textColor="var(--color-blue-light)"
                            borderColor="var(--color-blue-light)"
                            className="mb-3 me-3 small-button"
                            disabled={loading!==""}
                            key={index}
                            onClick={()=>props.data.handleActivity(activity.key)}
                        >
                            {activity.text}
                        </DefaultButton>
                    )
                ))}
            </div>
        </div>
        <div className="mb-4">
            <p className="h5">Season</p>
            <div className="">
                {seasonList.map((season, index)=>(
                    _season.filter((g:any)=>g===season.key).length?(
                        <DefaultButton
                            color="var(--color-blue-light)"
                            textColor="white"
                            borderColor="var(--color-blue-light)"
                            className="mb-3 me-3 small-button"
                            disabled={loading!==""}
                            key={index}
                            onClick={()=>props.data.handleSeason(season.key)}
                        >
                            {season.text}
                        </DefaultButton>
                    ):(
                        <DefaultButton
                            color="white"
                            textColor="var(--color-blue-light)"
                            borderColor="var(--color-blue-light)"
                            className="mb-3 me-3 small-button"
                            disabled={loading!==""}
                            key={index}
                            onClick={()=>props.data.handleSeason(season.key)}
                        >
                            {season.text}
                        </DefaultButton>
                    )
                ))}
            </div>
        </div>
        <div className="mb-4">
            <p className="h5">Region</p>
            <Select
                items={regionList}
                textColor="var(--color-blue-light)"
                disabled={loading!==""}
                value={_region}
                onChange={props.data.setRegion}
            />
        </div>
        <div className="mb-4">
            <p className="h5">Radio Station</p>
            {_station.length>0&&stationList.map((station:any)=>(
                _station.filter((s:any)=>s===station.radioId).length>0&&(
                    <DefaultButton
                        color="white"
                        textColor="var(--color-blue-light)"
                        borderColor="var(--color-blue-light)"
                        className="mb-3 me-3 small-button"
                        disabled={loading!==""}
                        key={"station_"+station.radioId}
                    >
                        {station.radioName}
                        <span
                            onClick={()=>props.data.handleStation(station.radioId)}
                        >
                            <Icon
                                name="close"
                                color="var(--color-blue-light)"
                            />
                        </span>
                    </DefaultButton>
                )   
            ))}
            <AutoComplete
                width={"100%"}
                items={stationList}
                itemKeyProperty={"radioId"}
                itemLabelProperty={"radioName"}
                disabled={loading!==""}
                value={searchStation}
                onChange={props.data.setSearchStation}
                borderColor="var(--color-blue-light)"
            />
        </div> */}
        </fieldset>
    );
};

export default SearchSide;
