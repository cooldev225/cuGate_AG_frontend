import { Select } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { IconMap } from "antd/es/result";
import React from "react";
import { AutoComplete, DefaultButton, Icon } from "../widgets";
import remove_icon from '../../assets/images/icon-remove.svg';
import "./../../assets/scss/components/dashboard/searchTrack.scss";
export const SearchTrack: React.FC<any> = (props) => {
    const {
        _genre = [],
        _mood = [],
        // _activity = [],
        // _season = [],
        // _region = "",
        // _station = [],
        loading = false,
        // searchGenre = null,
        genreList = [],
        moodList = [],
        // searchStation = "",
        // stationList = []
    } = props.data;
    return (
        <div className="search-track-component">
            <div className="container">
                <div className="label fw-bold text-white mb-4">Let us help you to find right track</div>
                <div className="search-content row d-flex flex-row position-relative justify-content-between">
                    <div className="col-md-2 search-item">
                        <div className="item-header">
                            <div className="text-white item-title">Artist</div>
                            <div className="text-white count-found">found 23 of 12</div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: "100%" }}>
                            <Select className="select-search" size="large"></Select>
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-2">
                            <div className="d-flex flex-row align-items-center me-4 mb-1 selected-search">
                                <div className="me-2 title">Robert Williams</div>
                                <img alt="remove" className="remove-selected" src={remove_icon} />

                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 search-item">
                        <div className="item-header">
                            <div className="text-white item-title">Composer</div>
                            <div className="text-white count-found">found 23 of 12</div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: "100%" }}>
                            <Select className="select-search" size="large"></Select>
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-2">
                            <div className="d-flex flex-row align-items-center me-4 mb-1 selected-search">
                                <div className="me-2 title">Robert Williams</div>
                                <img alt="remove" className="remove-selected" src={remove_icon} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 search-item">
                        <div className="item-header">
                            <div className="text-white item-title">Tempo</div>
                            <div className="text-white count-found">found 23 of 12</div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: "100%" }}>
                            <Select className="select-search" size="large"></Select>
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-2">
                            <div className="d-flex flex-row align-items-center me-4 mb-1 selected-search">
                                <div className="me-2 title">Robert Williams</div>
                                <img alt="remove" className="remove-selected" src={remove_icon} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 search-item">
                        <div className="item-header">
                            <div className="text-white item-title">Genre </div>
                            {/* <div className="text-white count-found">found 23 of 12</div> */}
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: "100%" }}>
                            <Select className="select-search" size="large" showSearch onChange={(item) => props.data.setSearchGenre(item)} disabled={loading!==""}>
                                {
                                    genreList.map((item: any) => (
                                        <option value={item.id}>{item.title}</option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-2">
                            {_genre.map((item: any) => (
                                <div className="d-flex flex-row align-items-center me-4 mb-1 selected-search" key={"genre_" + item} onClick={() => props.data.handleGenre(item)}>
                                    <div className="me-2 title">{genreList.find((g: any) => g.id === item).title}</div>
                                    <img alt="remove" className="remove-selected" src={remove_icon} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-2 search-item">
                        <div className="item-header">
                            <div className="text-white item-title">Mood</div>
                            {/* <div className="text-white count-found">found 23 of 12</div> */}
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: "100%" }}>
                            <Select className="select-search" size="large" onChange={(item) => props.data.handleMood(item)} disabled={loading!==""}>
                                {
                                    moodList.map((item: any) => (
                                        <option value={item.id}>{item.title}</option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="d-flex flex-row flex-wrap mt-2">
                            {_mood.map((item: any) => (
                                <div className="d-flex flex-row align-items-center me-4 mb-1 selected-search" key={"mood_" + item} onClick={() => props.data.handleMood(item)}>
                                    <div className="me-2 title">{moodList.find((m: any) => m.id === item).title}</div>
                                    <img alt="remove" className="remove-selected" src={remove_icon} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end pt-2 mt-2">
                    <div className="col-md-4 d-flex justify-content-end">
                        <div className="d-flex justify-content-end align-items-center me-5">
                            <div className="text-decoration-underline fs-5 btn-reset-filter">Reset filter</div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center btn-filter px-4 py-2">
                            <div className="me-3 px-1 fw-semibold">Filter</div>
                            <img src="https://catalog.cugate.com/static/media/Filter.a7f57a77a3d62334ffab6c905c11a133.svg" alt="filter" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchTrack;
