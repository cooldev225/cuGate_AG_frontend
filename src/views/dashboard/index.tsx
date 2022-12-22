import { Fragment, useEffect, useState } from "react";
import "../../assets/scss/dashboard.scss";
import { DefaultButton, Icon, Select } from "../../components/widgets";
import { getAnalyzeTrackInfo, getFilterStations, getGenres, getMoods, getSearchAlbumList, getSearchArtistList, getSearchStationList, getSearchTrackList } from "../../actions/user";
import useAuth from "../../hooks/useAuth";
import { sortByList, tabMenuList } from "./contents";
import icon from '../../assets/images/icon-cugate.svg';
import moment from "moment";
import AnalyseView from "../../components/dashboard/analyseView";
import SearchSide from "../../components/dashboard/searchSide";
import AnalyseForm from "../../components/dashboard/analyseForm";
import { useSelector } from "react-redux";
import { StoreState } from "../../types/models/store";

export const DashboardPage: React.FC = () => {
    const { user } = useAuth() as any;
    const { keyword } = useSelector((state: StoreState) => state.auth);
    const [genreList, setGenreList] = useState<any>([]);
    const [moodList, setMoodList] = useState<any>([]);
    const [stationList, setStationList] = useState<any>([]);
    const [tab_menu, setTabMenu] = useState<string>("tracks");
    const [searchGenre, setSearchGenre] = useState("");
    const [searchStation, setSearchStation] = useState<any>("");
    const [loading, setLoading] = useState("");
    const [moreLoading, setMoreLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        genre: [],
        mood: [],
        activity: [],
        season: [],
        region: "all",
        station: [],
        keyword: "",
        sort_by: sortByList[0].value,
    });
    const [analyzeClose, setAnalyzeClose] = useState(false);
    const defaultDataList = {
        pagination: {
            page: 0,
            pages: 0,
            size: 10,
            total: 0,
        },
        isLoaded: false,
        list: [],
    };

    const [analyzeFile, setAnalyzeFile] = useState<any>(null);
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [uploadedFileDiv, setUploadedFileDiv] = useState<any>("");


    const [trackSearch, setTrackSearch] = useState<any>(defaultDataList);
    const [albumSearch, setAlbumSearch] = useState<any>(defaultDataList);
    const [artistSearch, setArtistSearch] = useState<any>(defaultDataList);
    const [stationSearch, setStationSearch] = useState<any>(defaultDataList);

    useEffect(() => {
        if (user && user.profile) {
            getMoods().then((data) => {
                setMoodList(data.result);
            });
            getGenres().then((data) => {
                setGenreList(data.result);
            });

            getFilterStations().then((data) => {
                setStationList(data.result);
            });

            if (user.profile?.favorite_moods !== "") {
                formData.mood = user.profile.favorite_moods.split(',').map((m: string) => Number(m));
            }
            if (user.profile?.favorite_activities !== "") {
                formData.activity = user.profile.favorite_activities.split(',');
            }
            if (user.profile?.favorite_seasons !== "") {
                formData.season = user.profile.favorite_seasons.split(',');
            }
            setFormData({ ...formData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        formData.keyword = keyword;
        setFormData({ ...formData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    useEffect(() => {
        if (loading !== "") return;
        if (tab_menu === "tracks") {
            setLoading("tracks");
            getSearchTrackList({
                pagination: trackSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setTrackSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        if (tab_menu === "albums") {
            setLoading("albums");
            getSearchAlbumList({
                pagination: albumSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setAlbumSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        if (tab_menu === "artists") {
            setLoading("artists");
            getSearchArtistList({
                pagination: artistSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setArtistSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        if (tab_menu === "stations") {
            setLoading("stations");
            getSearchStationList({
                pagination: stationSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setStationSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (loading !== "") return;
        if (tab_menu === "tracks") {
            if (trackSearch.isLoaded) return;
            setLoading("tracks");
            getSearchTrackList({
                pagination: trackSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setTrackSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        if (tab_menu === "albums") {
            if (albumSearch.isLoaded) return;
            setLoading("albums");
            getSearchAlbumList({
                pagination: albumSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setAlbumSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        if (tab_menu === "artists") {
            if (artistSearch.isLoaded) return;
            setLoading("artists");
            getSearchArtistList({
                pagination: artistSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setArtistSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        if (tab_menu === "stations") {
            if (stationSearch.isLoaded) return;
            setLoading("stations");
            getSearchStationList({
                pagination: stationSearch.pagination,
                filter: formData
            }).then((data) => {
                setLoading("");
                data.result.isLoaded = true;
                setStationSearch(data.result);
            }).catch((err) => {
                console.log(err);
                setLoading("");
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab_menu]);

    const handleMore = () => {
        if (loading !== "") return;
        if (tab_menu === "tracks") {
            let data = trackSearch;
            data.pagination.page++;
            setMoreLoading(true);
            getSearchTrackList({
                pagination: data.pagination,
                filter: formData
            }).then((res) => {
                data.pagination = res.result.pagination;
                res.result.list.map((r: any) => data.list.push(r));
                setTrackSearch({ ...data });
                setMoreLoading(false);
            }).catch((err) => {
                console.log(err);
                setMoreLoading(false);
            });
        }
        if (tab_menu === "albums") {
            let data = albumSearch;
            data.pagination.page++;
            setMoreLoading(true);
            getSearchAlbumList({
                pagination: data.pagination,
                filter: formData
            }).then((res) => {
                data.pagination = res.result.pagination;
                res.result.list.map((r: any) => data.list.push(r));
                setAlbumSearch({ ...data });
                setMoreLoading(false);
            }).catch((err) => {
                console.log(err);
                setMoreLoading(false);
            });
        }
        if (tab_menu === "artists") {
            let data = artistSearch;
            data.pagination.page++;
            setMoreLoading(true);
            getSearchArtistList({
                pagination: data.pagination,
                filter: formData
            }).then((res) => {
                data.pagination = res.result.pagination;
                res.result.list.map((r: any) => data.list.push(r));
                setArtistSearch({ ...data });
                setMoreLoading(false);
            }).catch((err) => {
                console.log(err);
                setMoreLoading(false);
            });
        }
        if (tab_menu === "stations") {
            let data = stationSearch;
            data.pagination.page++;
            setMoreLoading(true);
            getSearchStationList({
                pagination: data.pagination,
                filter: formData
            }).then((res) => {
                data.pagination = res.result.pagination;
                res.result.list.map((r: any) => data.list.push(r));
                setStationSearch({ ...data });
                setMoreLoading(false);
            }).catch((err) => {
                console.log(err);
                setMoreLoading(false);
            });
        }
    };

    useEffect(() => {
        if (loading !== "") return;
        if (searchStation !== "" && !formData.station.filter((g: any) => g === searchStation).length) {
            let list = formData.station;
            list.push(searchStation);
            setFormData({ ...formData, station: list });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchStation]);

    useEffect(() => {
        console.log(searchGenre);
        if (loading !== "") return;
        if (searchGenre !== "" && !formData.genre.filter((g: any) => g === searchGenre).length) {
            let list = formData.genre;
            list.push(searchGenre);
            setFormData({ ...formData, genre: list });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchGenre]);

    const handleGenre = (genre: any) => {
        let list: any[] = [];
        formData.genre.forEach((g: any) => {
            if (genre !== g) list.push(g);
        });
        if (!formData.genre.filter((g: any) => g === genre).length) {
            list.push(genre);
        }
        setFormData({ ...formData, genre: list });
    };

    const handleMood = (mood: number) => {
        if (loading !== "") return;
        let list = [];
        formData.mood.forEach((g: any) => {
            if (mood !== g) list.push(g);
        });
        if (!formData.mood.filter((g: any) => g === mood).length) {
            list.push(mood);
        }
        setFormData({ ...formData, mood: list });
    };

    const handleActivity = (activity: any) => {
        if (loading !== "") return;
        let list = [];
        formData.activity.forEach((g: any) => {
            if (activity !== g) list.push(g);
        });
        if (!formData.activity.filter((g: any) => g === activity).length) {
            list.push(activity);
        }
        setFormData({ ...formData, activity: list });
    };

    const handleSeason = (season: any) => {
        if (loading !== "") return;
        let list = [];
        formData.season.forEach((g: any) => {
            if (season !== g) list.push(g);
        });
        if (!formData.season.filter((g: any) => g === season).length) {
            list.push(season);
        }
        setFormData({ ...formData, season: list });
    };

    const setRegion = (v: any) => {
        if (loading !== "") return;
        setFormData({ ...formData, region: v });
    };

    const handleStation = (station: any) => {
        if (loading !== "") return;
        let list: any[] = [];
        formData.station.forEach((g: any) => {
            if (station !== g) list.push(g);
        });
        if (!formData.station.filter((g: any) => g === station).length) {
            list.push(station);
        }
        setFormData({ ...formData, station: list });
    };

    const handleAnalyze = () => {
        if (uploadedFile && !uploadedFileDiv) {
            setTabMenu("analyze");
            setLoading("analyze");
            getAnalyzeTrackInfo(uploadedFile).then((data: any) => {
                setLoading("");
                setUploadedFileDiv(data.data);
            });
        }
    };

    const handleTrackDetail = (track_id: number, file_id: number) => {

    };

    const handleAlbumDetail = (album_id: number) => { };

    const handleSortBy = (val: any) => {
        if (loading !== "") return;
        setFormData({ ...formData, sort_by: val });
    };

    return (
        <div className="page page-dashboard uk-container-large mt-5 row">
            <aside className="col-sm-12 col-md-4 left-menu">
                <SearchSide data={
                    {
                        "_genre": formData.genre,
                        "_mood": formData.mood,
                        "_activity": formData.activity,
                        "_season": formData.season,
                        "_region": formData.region,
                        "_station": formData.station,
                        "searchGenre": searchGenre,
                        "searchStation": searchStation,
                        "loading": loading,
                        "handleGenre": handleGenre,
                        "handleMood": handleMood,
                        "handleActivity": handleActivity,
                        "handleSeason": handleSeason,
                        "handleStation": handleStation,
                        "setRegion": setRegion,
                        "setSearchGenre": setSearchGenre,
                        "setSearchStation": setSearchStation,
                        "genreList": genreList,
                        "moodList": moodList,
                        "stationList": stationList
                    }
                } />
            </aside>
            <div className="col-sm-12 col-md-8 content-wrapper">
                {(!analyzeClose || tab_menu === "analyze") && (
                    <AnalyseForm data={
                        {
                            "analyzeFile": analyzeFile,
                            "uploadedFile": uploadedFile,
                            "uploadedFileDiv": uploadedFileDiv,
                            "setUploadedFileDiv": setUploadedFileDiv,
                            "loading": loading,
                            "setAnalyzeFile": setAnalyzeFile,
                            "setUploadedFile": setUploadedFile,
                            "handleAnalyze": handleAnalyze,
                            "setAnalyzeClose": setAnalyzeClose,
                            "setTabMenu": setTabMenu,
                            "setLoading": setLoading
                        }
                    } />
                )}
                <div className="tab-header w-100 mb-2">
                    <ul className="d-flex justify-content-end">
                        {tabMenuList.map((tab) => (
                            <li
                                className={"d-flex" + (tab_menu === tab.key ? " active" : "")}
                                key={"tab_menu_item_" + tab.key}
                                onClick={() => setTabMenu(tab.key)}
                            >
                                {tab.text}
                            </li>
                        ))}
                    </ul>
                </div>
                {tab_menu !== "analyze" && (
                    <div className="content-header d-flex justify-content-between mb-2">
                        <div className="sort-by-header d-flex">
                            <label className="d-flex align-items-center">Sort By: </label>
                            <Select
                                items={sortByList}
                                width="180px"
                                textColor="var(--color-blue-light)"
                                value={formData.sort_by}
                                onChange={handleSortBy}
                            />
                        </div>
                        <div className="status-header">
                            <span>total results: {
                                loading !== "" ? "..." :
                                    tab_menu === "tracks" ? trackSearch.pagination.total :
                                        tab_menu === "albums" ? albumSearch.pagination.total :
                                            tab_menu === "artists" ? artistSearch.pagination.total :
                                                tab_menu === "stations" ? stationSearch.pagination.total :
                                                    ""
                            }</span>
                        </div>
                    </div>
                )}
                <div className="content-body">
                    {tab_menu === "tracks" ? (
                        <Fragment>
                            {loading === "tracks" ? (
                                <div className="loading-widget">
                                    <div className="logo-img">
                                        <img src={icon} alt="loading" />
                                        <div className="loading-text">
                                            Loading ...
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    {trackSearch.list.map((item: any, index: number) => (
                                        <Fragment>
                                            {(formData.sort_by === "played_ranking" || formData.sort_by === "played_count") ? (
                                                <div className="row-item mb-3" key={"item_" + index}>
                                                    <div className="item-header d-flex justify-content-between">
                                                        <div className="d-flex flex-column">
                                                            <span className="title">{item.media}<span></span></span>
                                                            <span className="description">Published: {item.lastUpdated} by: {item.artist}</span>
                                                        </div>
                                                        <DefaultButton
                                                            className="small-button"
                                                            color="white"
                                                            textColor="var(--color-blue-light)"
                                                            borderColor="var(--color-blue-light)"
                                                            onClick={() => handleTrackDetail(item.id, item.file_info.file_id)}
                                                        >
                                                            View
                                                        </DefaultButton>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="d-flex item-album w-100">
                                                            <img src={`https://img.cugate.com/?i=${item.albumId}&o=member`} alt="" />
                                                            <div className="ms-2 item-album-title w-100">
                                                                <div dangerouslySetInnerHTML={{ __html: item.resume }}></div>
                                                                <div className="d-flex description mt-4">
                                                                    <div className={item.rank + "," + item.lastRank}>
                                                                        <span className="me-1">Rank:</span>
                                                                        {item.lastRank == null || item.rank < item.lastRank ? (
                                                                            <span className="color-green">{item.rank}<Icon name="arrow-up" /></span>
                                                                        ) : (
                                                                            <span className="color-red">{item.rank}<Icon name="arrow-down" /></span>
                                                                        )}
                                                                    </div>
                                                                    <div className="ms-4">
                                                                        <span className="me-1">Type:</span>
                                                                        {item.file_info.f_track_type_title}
                                                                    </div>
                                                                    {genreList.filter((g: any) => g.id === item.genre).length > 0 && (<div className="ms-4">
                                                                        <span className="me-1">Genre:</span>
                                                                        {genreList.filter((g: any) => g.id === item.genre)[0].title}
                                                                    </div>)}
                                                                    {moodList.filter((g: any) => g.id === item.key).length > 0 && (<div className="ms-4">
                                                                        <span className="me-1">Mood:</span>
                                                                        {moodList.filter((g: any) => g.id === item.key)[0].title}
                                                                    </div>)}
                                                                    <div className="ms-4">
                                                                        <span className="me-1">Time:</span>
                                                                        {item.file_info.f_track_time / 1000}s
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex description">
                                                                    <div className="d-flex w-100">
                                                                        <span className="me-2 mt-1">Frequency:</span>
                                                                        <div style={{
                                                                            width: '100%',
                                                                            maxWidth: '400px',
                                                                            backgroundColor: '#dcfdff',
                                                                            marginTop: 4,
                                                                            borderRadius: 2,
                                                                            color: 'black',
                                                                        }}>
                                                                            <div style={{
                                                                                width: (100 * item.sum_count / trackSearch.pagination.sum) + '%',
                                                                                height: '100%',
                                                                                backgroundColor: '#00cbd8',
                                                                            }}>
                                                                                <span className="fw-bold ms-2">{item.sum_count}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ms-4">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="d-flex align-items-end" style={{ color: 'grey' }}>
                                                            {item.played_count > 0 ? item.played_count + " played" : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row-item mb-3" key={"item_" + index}>
                                                    <div className="item-header d-flex justify-content-between">
                                                        <div className="d-flex flex-column">
                                                            <span className="title">{item.title}</span>
                                                            <span className="description">Published: {moment(item.update_time).format("DD/MM/YYYY")} by {item.track_member_title}</span>
                                                        </div>
                                                        <DefaultButton
                                                            className="small-button"
                                                            color="white"
                                                            textColor="var(--color-blue-light)"
                                                            borderColor="var(--color-blue-light)"
                                                            onClick={() => handleTrackDetail(item.id, item.file_info.file_id)}
                                                        >
                                                            Analyze
                                                        </DefaultButton>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex item-album">
                                                            <img src={`https://img.cugate.com/?i=${item.album_id}&o=member`} alt="" />
                                                            <div className="ms-2 item-album-title">
                                                                <div className="fw-bold">{item.album_title}</div>
                                                                <div className="d-flex">
                                                                    <div className="">
                                                                        <span className="me-1">By:</span>
                                                                        {item.album_member_title}
                                                                    </div>
                                                                    <div className="ms-4">
                                                                        <span className="me-1">Type:</span>
                                                                        {item.file_info.f_track_type_title}
                                                                    </div>
                                                                    <div className="ms-4">
                                                                        <span className="me-1">Time:</span>
                                                                        {item.file_info.f_track_time / 1000}s
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-2 mt-3"></div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="d-flex align-items-end" style={{ color: 'grey' }}>
                                                            {item.played_count > 0 ? item.played_count + " played" : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>
                                    ))}
                                    {trackSearch.pagination.pages > 0 && trackSearch.pagination.pages > trackSearch.pagination.page + 1 && (
                                        <div
                                            className="row d-flex justify-content-center mt-4 mb-4"
                                        >
                                            <div style={{ width: '200px', textAlign: 'center' }}>
                                                <DefaultButton
                                                    color="white"
                                                    textColor="var(--color-blue-light)"
                                                    borderColor="var(--color-blue-light)"
                                                    className={"mb-3 me-3"}
                                                    onClick={() => handleMore()}
                                                >
                                                    {moreLoading ? (
                                                        <Icon name="loading" />
                                                    ) : (
                                                        "More"
                                                    )}
                                                </DefaultButton>
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            )}
                        </Fragment>
                    ) : tab_menu === "albums" ? (
                        <Fragment>
                            {loading === "albums" ? (
                                <div className="loading-widget">
                                    <div className="logo-img">
                                        <img src={icon} alt="loading" />
                                        <div className="loading-text">
                                            Loading ...
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    {albumSearch.list.map((item: any, index: number) => (
                                        <Fragment>
                                            {(formData.sort_by === "played_ranking" || formData.sort_by === "played_count") ? (
                                                <div className="row-item mb-3" key={"item_" + index}>
                                                    <div className="item-header d-flex justify-content-between">
                                                        <div className="d-flex flex-column">
                                                            <span className="title">{item.media}<span></span></span>
                                                            <span className="description">Published: {item.lastUpdated} by: {item.artist}</span>
                                                        </div>
                                                        <DefaultButton
                                                            className="small-button"
                                                            color="white"
                                                            textColor="var(--color-blue-light)"
                                                            borderColor="var(--color-blue-light)"
                                                            onClick={() => handleTrackDetail(item.id, item.file_info.file_id)}
                                                        >
                                                            View
                                                        </DefaultButton>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="d-flex item-album w-100">
                                                            <img src={`https://img.cugate.com/?i=${item.albumId}&o=member`} alt="" />
                                                            <div className="ms-2 item-album-title w-100">
                                                                <div dangerouslySetInnerHTML={{ __html: item.resume }}></div>
                                                                <div className="d-flex description mt-4">
                                                                    <div className={item.rank + "," + item.lastRank}>
                                                                        <span className="me-1">Rank:</span>
                                                                        {item.lastRank == null || item.rank < item.lastRank ? (
                                                                            <span className="color-green">{item.rank}<Icon name="arrow-up" /></span>
                                                                        ) : (
                                                                            <span className="color-red">{item.rank}<Icon name="arrow-down" /></span>
                                                                        )}
                                                                    </div>
                                                                    {genreList.filter((g: any) => g.id === item.genre).length > 0 && (<div className="ms-4">
                                                                        <span className="me-1">Genre:</span>
                                                                        {genreList.filter((g: any) => g.id === item.genre)[0].title}
                                                                    </div>)}
                                                                    {moodList.filter((g: any) => g.id === item.key).length > 0 && (<div className="ms-4">
                                                                        <span className="me-1">Mood:</span>
                                                                        {moodList.filter((g: any) => g.id === item.key)[0].title}
                                                                    </div>)}
                                                                </div>
                                                                <div className="d-flex description">
                                                                    <div className="d-flex w-100">
                                                                        <span className="me-2 mt-1">Frequency:</span>
                                                                        <div style={{
                                                                            width: '100%',
                                                                            maxWidth: '400px',
                                                                            backgroundColor: '#dcfdff',
                                                                            marginTop: 4,
                                                                            borderRadius: 2,
                                                                            color: 'black',
                                                                        }}>
                                                                            <div style={{
                                                                                width: (100 * item.sum_count / albumSearch.pagination.sum) + '%',
                                                                                height: '100%',
                                                                                backgroundColor: '#00cbd8',
                                                                            }}>
                                                                                <span className="fw-bold ms-2">{item.sum_count}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ms-4">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="d-flex align-items-end" style={{ color: 'grey' }}>
                                                            {item.played_count > 0 ? item.played_count + " played" : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row-item mb-3" key={"item_" + index}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex item-album">
                                                            <img src={`https://img.cugate.com/?o=album&i=${item.id}&s=174`} alt="" />
                                                            <div className="ms-2 item-album-title">
                                                                <div className="fw-bold">{item.title}</div>
                                                                <div>
                                                                    <span className="description">Published: {moment(item.update_time).format("DD/MM/YYYY")}</span></div>
                                                                <div className="d-flex">By:
                                                                    {item.members?.map((member: any, m_index: number) => (
                                                                        <div className="ms-1" key={item.id + "_" + m_index}>
                                                                            {m_index > 0 && (<span className="me-1">,</span>)}
                                                                            {member.title}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-2 mt-3">
                                                            <DefaultButton
                                                                className="small-button"
                                                                color="white"
                                                                textColor="var(--color-blue-light)"
                                                                borderColor="var(--color-blue-light)"
                                                                onClick={() => handleAlbumDetail(item.id)}
                                                            >
                                                                View
                                                            </DefaultButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>

                                    ))}
                                    {albumSearch.pagination.pages > 0 && albumSearch.pagination.pages > albumSearch.pagination.page + 1 && (
                                        <div
                                            className="row d-flex justify-content-center mt-4 mb-4"
                                        >
                                            <div style={{ width: '200px', textAlign: 'center' }}>
                                                <DefaultButton
                                                    color="white"
                                                    textColor="var(--color-blue-light)"
                                                    borderColor="var(--color-blue-light)"
                                                    className={"mb-3 me-3"}
                                                    onClick={() => handleMore()}
                                                >
                                                    {moreLoading ? (
                                                        <Icon name="loading" />
                                                    ) : (
                                                        "More"
                                                    )}
                                                </DefaultButton>
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            )}
                        </Fragment>
                    ) : tab_menu === "artists" ? (
                        <Fragment>
                            {loading === "artists" ? (
                                <div className="loading-widget">
                                    <div className="logo-img">
                                        <img src={icon} alt="loading" />
                                        <div className="loading-text">
                                            Loading ...
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    {artistSearch.list.map((item: any, index: number) => (
                                        <Fragment>
                                            {(formData.sort_by === "played_ranking" || formData.sort_by === "played_count") ? (
                                                <div className="row-item mb-3" key={"item_" + index}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-grow-1 item-album">
                                                            <img src={`https://img.cugate.com/?o=member&i=${item.id}&s=174`} alt="" />
                                                            <div className="ms-2 flex-grow-1 item-album-title">
                                                                <div className="fw-bold">{item.artist}</div>
                                                                <div className="fw-bold">
                                                                    <span>Rank:</span>
                                                                    <span>{item.rank}</span>
                                                                </div>
                                                                {/* <div className="fw-bold">
                                                                    <span>Last Week Rank:</span>
                                                                    <span>{item.lastRank}</span>
                                                                </div> */}
                                                                <div className="d-flex description">
                                                                    <div className="d-flex w-100">
                                                                        <span className="me-2 mt-1">Frequency:</span>
                                                                        <div style={{
                                                                            width: '100%',
                                                                            maxWidth: '400px',
                                                                            backgroundColor: '#dcfdff',
                                                                            marginTop: 4,
                                                                            borderRadius: 2,
                                                                            color: 'black',
                                                                        }}>
                                                                            <div style={{
                                                                                width: (100 * item.count / artistSearch.pagination.max_count) + '%',
                                                                                height: '100%',
                                                                                backgroundColor: '#00cbd8',
                                                                            }}>
                                                                                <span className="fw-bold ms-2">{item.count}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ms-4">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-2 mt-3">
                                                            <DefaultButton
                                                                className="small-button"
                                                                color="white"
                                                                textColor="var(--color-blue-light)"
                                                                borderColor="var(--color-blue-light)"
                                                                onClick={() => handleAlbumDetail(item.id)}
                                                            >
                                                                View
                                                            </DefaultButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row-item mb-3" key={"item_" + index}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex item-album">
                                                            <img src={`https://img.cugate.com/?o=member&i=${item.id}&s=174`} alt="" />
                                                            <div className="ms-2 item-album-title">
                                                                <div className="fw-bold">{item.title}</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-2 mt-3">
                                                            <DefaultButton
                                                                className="small-button"
                                                                color="white"
                                                                textColor="var(--color-blue-light)"
                                                                borderColor="var(--color-blue-light)"
                                                                onClick={() => handleAlbumDetail(item.id)}
                                                            >
                                                                View
                                                            </DefaultButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>
                                    ))}
                                    {artistSearch.pagination.pages > 0 && artistSearch.pagination.pages > artistSearch.pagination.page + 1 && (
                                        <div
                                            className="row d-flex justify-content-center mt-4 mb-4"
                                        >
                                            <div style={{ width: '200px', textAlign: 'center' }}>
                                                <DefaultButton
                                                    color="white"
                                                    textColor="var(--color-blue-light)"
                                                    borderColor="var(--color-blue-light)"
                                                    className={"mb-3 me-3"}
                                                    onClick={() => handleMore()}
                                                >
                                                    {moreLoading ? (
                                                        <Icon name="loading" />
                                                    ) : (
                                                        "More"
                                                    )}
                                                </DefaultButton>
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            )}
                        </Fragment>
                    ) : tab_menu === "stations" ? (
                        <Fragment>
                            {loading === "stations" ? (
                                <div className="loading-widget">
                                    <div className="logo-img">
                                        <img src={icon} alt="loading" />
                                        <div className="loading-text">
                                            Loading ...
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    {stationSearch.list.map((item: any, index: number) => (
                                        <div className="row-item mb-3" key={"item_" + index}>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex item-album">
                                                    <div className="ms-2 item-album-title">
                                                        <div className="fw-bold focus" onClick={() => window.open(item.playerUrl, "_blank")}>{item.radioName}</div>
                                                        <div className="">{item.radioProperty}</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex mb-2 mt-3">
                                                    <DefaultButton
                                                        className="small-button"
                                                        color="white"
                                                        textColor="var(--color-blue-light)"
                                                        borderColor="var(--color-blue-light)"
                                                        onClick={() => handleAlbumDetail(item.id)}
                                                    >
                                                        View
                                                    </DefaultButton>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {stationSearch.pagination.pages > 0 && stationSearch.pagination.pages > stationSearch.pagination.page + 1 && (
                                        <div
                                            className="row d-flex justify-content-center mt-4 mb-4"
                                        >
                                            <div style={{ width: '200px', textAlign: 'center' }}>
                                                <DefaultButton
                                                    color="white"
                                                    textColor="var(--color-blue-light)"
                                                    borderColor="var(--color-blue-light)"
                                                    className={"mb-3 me-3"}
                                                    onClick={() => handleMore()}
                                                >
                                                    {moreLoading ? (
                                                        <Icon name="loading" />
                                                    ) : (
                                                        "More"
                                                    )}
                                                </DefaultButton>
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            )}
                        </Fragment>
                    ) : tab_menu === "analyze" ? (
                        uploadedFileDiv && analyzeFile ? (
                            <AnalyseView data={uploadedFileDiv} url={URL.createObjectURL(analyzeFile)} />
                        ) : (
                            <>There is no uploaded file.</>
                        )
                    ) : (<></>)
                    }
                </div>
            </div>
        </div>
    );
};
