import { Fragment, useCallback, useEffect, useState } from "react";
import "../../assets/scss/dashboard.scss";
import { AutoComplete, DefaultButton, Icon, Select } from "../../components/widgets";
import { uploadTrackToAnalyze, getAnalyzeTrackInfo, getFilterStations, getGenres, getMoods, getSearchTrackList } from "../../actions/user";
import useAuth from "../../hooks/useAuth";
import { activityList, seasonList } from "../profile/contents";
import { Link } from "react-router-dom";
import { sortByList, regionList, tabMenuList } from "./contents";
import icon from '../../assets/images/icon-cugate.svg';
import moment from "moment";
import { useDropzone } from "react-dropzone";
import ReactAudioPlayer from "react-audio-player";

export const DashboardPage: React.FC = () => {
    const { user } = useAuth() as any;
    const [tab_menu, setTabMenu] = useState<string>("tracks");
    const [genreList, setGenreList] = useState<any>([]);
    const [searchGenre, setSearchGenre] = useState("");
    const [moodList, setMoodList] = useState<any>([]);
    const [stationList, setStationList] = useState<any>([]);
    const [searchStation, setSearchStation] = useState<any>("");
    const [loading, setLoading] = useState("");
    const [moreLoading, setMoreLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        genre: [],
        mood: [],
        activity: [],
        season: [],
        region: "all",
        station:[],
        sort_by: sortByList[0].value,
    });
    const [analyzeClose, setAnalyzeClose] = useState(false);

    const onDrop = useCallback((acceptedFiles: any[]) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                // console.log(e.target?.result);
                setTabMenu("analyze");
                setLoading("analyze");
                uploadTrackToAnalyze(file).then((data: any)=>{
                    setLoading("");
                    setUploadedFile(data.data);
                });
            };
            reader.readAsDataURL(file);
            setAnalyzeFile(file);
            return file;
        });
    }, []);
    const [analyzeFile, setAnalyzeFile] = useState<any>(null);
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [uploadedFileDiv, setUploadedFileDiv] = useState<any>("");
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mp3': ['.mp3'],
            'audio/wav': ['.wav']
        }
    });
    
    const [trackSearch, setTrackSearch] = useState<any>({
        pagination:{
            page: 0,
            pages: 0,
            size: 10,
            total: 0,
        },
        list: [],
    });

    useEffect(()=>{
        if(user&&user.profile){
            getMoods().then((data) => {
                setMoodList(data.result);
                if(user.profile?.favorite_moods!==""){
                    let list = user.profile.favorite_moods.split(',').map((m:string)=>Number(m));
                    formData.mood = list;
                    setFormData({...formData});
                }
            });
            getGenres().then((data) => {
                setGenreList(data.result);
                // if(user.profile?.favorite_genres!==""){
                //     let list = user.profile.favorite_genres.split(',').map((m:string)=>Number(m));
                //     formData.genre = list;
                //     setFormData({...formData});
                // }
            });
            
            if(user.profile?.favorite_activities!==""){
                formData.activity = user.profile.favorite_activities.split(',');
            }
            if(user.profile?.favorite_seasons!==""){
                formData.season = user.profile.favorite_seasons.split(',');
            }
            setFormData({...formData});

            getFilterStations().then((data)=>{
                setStationList(data.result);
            });
        }
    }, [user]);

    useEffect(()=>{
        
    },[tab_menu]);

    useEffect(()=>{
        if(loading!=="") return;
        if(tab_menu==="tracks"){
            setLoading("tracks");
            getSearchTrackList({
                pagination: trackSearch.pagination,
                filter: formData
            }).then((data)=>{
                setLoading("");
                setTrackSearch(data.result);
            }).catch((err)=>{
                console.log(err);
                setLoading("");
            });
        }
    },[formData]);

    const handleMore = () => {
        if(loading!=="") return;
        if(tab_menu==="tracks"){
            let data = trackSearch;
            data.pagination.page ++;
            setMoreLoading(true);
            getSearchTrackList({
                pagination: data.pagination,
                filter: formData
            }).then((res)=>{
                data.pagination = res.result.pagination;
                res.result.list.map((r:any)=>{
                    data.list.push(r);
                });
                setTrackSearch({...data});
                setMoreLoading(false);
            }).catch((err)=>{
                console.log(err);
                setMoreLoading(false);
            });
        }
    };

    useEffect(()=>{
        if(loading!=="") return;
        if(searchStation!==""&&!formData.station.filter((g:any)=>g===searchStation).length){
            let list = formData.station;
            list.push(searchStation);
            setFormData({...formData, list});
        }
    },[searchStation]);

    useEffect(()=>{
        if(loading!=="") return;
        if(searchGenre!==""&&!formData.genre.filter((g:any)=>g===searchGenre).length){
            let list = formData.genre;
            list.push(searchGenre);
            setFormData({...formData, list});
        }
    },[searchGenre]);

    const handleGenre = (genre: any) => {
        let list: any[] = [];
        formData.genre.forEach((g:any)=>{
            if(genre !== g) list.push(g);
        });
        if(!formData.genre.filter((g:any)=>g===genre).length){
            list.push(genre);
        }
        setFormData({...formData,genre:list});
    };

    const handleMood = (mood: number) => {
        if(loading!=="") return;
        let list = [];
        formData.mood.forEach((g:any)=>{
            if(mood !== g) list.push(g);
        });
        if(!formData.mood.filter((g:any)=>g===mood).length){
            list.push(mood);
        }
        setFormData({...formData,mood:list});
    };

    const handleActivity = (activity: any) => {
        if(loading!=="") return;
        let list = [];
        formData.activity.forEach((g:any)=>{
            if(activity !== g) list.push(g);
        });
        if(!formData.activity.filter((g:any)=>g===activity).length){
            list.push(activity);
        }
        setFormData({...formData,activity:list});
    };

    const handleSeason = (season: any) => {
        if(loading!=="") return;
        let list = [];
        formData.season.forEach((g:any)=>{
            if(season !== g) list.push(g);
        });
        if(!formData.season.filter((g:any)=>g===season).length){
            list.push(season);
        }
        setFormData({...formData,season:list});
    };

    const setRegion = (v:any) => {
        if(loading!=="") return;
        setFormData({...formData,region:v});
    };

    const handleStation = (station: any) => {
        if(loading!=="") return;
        let list: any[] = [];
        formData.station.forEach((g:any)=>{
            if(station !== g) list.push(g);
        });
        if(!formData.station.filter((g:any)=>g===station).length){
            list.push(station);
        }
        setFormData({...formData,station:list});
    };

    const handleAnalyze = () => {
        if(uploadedFile){
            setTabMenu("analyze");
            setLoading("analyze");
            getAnalyzeTrackInfo(uploadedFile).then((data: any)=>{
                setLoading("");
                setUploadedFileDiv(data.data);
            });
        }
    };

    const handleSortBy = (val:any) => {
        if(loading!=="") return;
        setFormData({...formData, sort_by: val});
    };

    return (
        <div className="page page-dashboard uk-container-large mt-5 row">
            <aside className="col-sm-12 col-md-4 left-menu">
                <fieldset className="box-common search-form">
                    <div className="mb-4">
                        <p className="h5">Genre</p>
                        <div className="">
                            {formData.genre.map((genre:any)=>(
                                <DefaultButton
                                    color="white"
                                    textColor="var(--color-blue-light)"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3 me-3 small-button"
                                    disabled={loading!==""}
                                    key={"genre_"+genre}
                                >
                                    {genre}
                                    <span
                                        onClick={()=>handleGenre(genre)}
                                    >
                                        <Icon
                                            name="close"
                                            color="var(--color-blue-light)"
                                        />
                                    </span>
                                </DefaultButton>
                            ))}
                            <AutoComplete
                                width={"100%"}
                                items={genreList}
                                itemKeyProperty={"title"}
                                itemLabelProperty={"title"}
                                value={searchGenre}
                                onChange={setSearchGenre}
                                disabled={loading!==""}
                                borderColor="var(--color-blue-light)"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="h5">Mood</p>
                        <div className="">
                            {moodList.map((mood:any)=>(
                                formData.mood.filter((g:any)=>g===mood.id).length?(
                                    <DefaultButton
                                        color="var(--color-blue-light)"
                                        textColor="white"
                                        borderColor="var(--color-blue-light)"
                                        className="mb-3 me-3 small-button"
                                        disabled={loading!==""}
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
                                        className="mb-3 me-3 small-button"
                                        disabled={loading!==""}
                                        key={mood.id}
                                        onClick={()=>handleMood(mood.id)}
                                    >
                                        {mood.title}
                                    </DefaultButton>
                                )
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="h5">Activity</p>
                        <div className="">
                            {activityList.map((activity, index)=>(
                                formData.activity.filter((g:any)=>g===activity.key).length?(
                                    <DefaultButton
                                        color="var(--color-blue-light)"
                                        textColor="white"
                                        borderColor="var(--color-blue-light)"
                                        className="mb-3 me-3 small-button"
                                        disabled={loading!==""}
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
                                        className="mb-3 me-3 small-button"
                                        disabled={loading!==""}
                                        key={index}
                                        onClick={()=>handleActivity(activity.key)}
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
                                formData.season.filter((g:any)=>g===season.key).length?(
                                    <DefaultButton
                                        color="var(--color-blue-light)"
                                        textColor="white"
                                        borderColor="var(--color-blue-light)"
                                        className="mb-3 me-3 small-button"
                                        disabled={loading!==""}
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
                                        className="mb-3 me-3 small-button"
                                        disabled={loading!==""}
                                        key={index}
                                        onClick={()=>handleSeason(season.key)}
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
                            value={formData.region}
                            onChange={setRegion}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="h5">Radio Station</p>
                        {formData.station.length>0&&stationList.map((station:any)=>(
                            formData.station.filter((s:any)=>s===station.radioId).length>0&&(
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
                                        onClick={()=>handleStation(station.radioId)}
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
                            onChange={setSearchStation}
                            borderColor="var(--color-blue-light)"
                        />
                    </div>
                </fieldset>
            </aside>
            <div className="col-sm-12 col-md-8 content-wrapper">
                {(!analyzeClose||tab_menu==="analyze")&&(analyzeFile?(
                    <div
                        className={"file-upload-box text-center drag-active"}
                    >
                        <div className="mt-5 mb-3 title">
                            {analyzeFile.name}
                        </div>
                        <div className="mb-3">
                            <ReactAudioPlayer
                                src={URL.createObjectURL(analyzeFile)}
                                // autoPlay
                                controls
                                className=""
                            />
                        </div>
                        {(loading!=="analyze"||loading==="analyze"&&uploadedFile!==null)&&(
                            <Fragment>
                                <DefaultButton
                                    color="var(--color-blue-light)"
                                    textColor="white"
                                    borderColor="var(--color-blue-light)"
                                    className="me-3"
                                    onClick={()=>{setAnalyzeFile(null);setUploadedFile(null);}}
                                >
                                    Cancel
                                </DefaultButton>
                                <DefaultButton
                                    color="var(--color-blue-light)"
                                    textColor="white"
                                    borderColor="var(--color-blue-light)"
                                    className="mb-3"
                                    disabled={uploadedFileDiv}
                                    onClick={handleAnalyze}
                                >
                                    {loading==="analyze"?(
                                        <Icon name='loading'/>
                                    ):(
                                        "Submit"
                                    )}
                                </DefaultButton>
                            </Fragment>
                        )}
                        <DefaultButton
                            color="var(--color-blue-light)"
                            textColor="white"
                            borderColor="var(--color-blue-light)"
                            className="close-btn"
                            onClick={()=>setAnalyzeClose(true)}
                        >
                            <Icon name="close"/>
                        </DefaultButton>
                    </div>
                ):(
                    <div
                        {...getRootProps({ className: "dropzone", accept: "mp3/*" })}
                        className={"focus file-upload-box text-center" + (isDragActive?" drag-active":"")}
                    >
                        <img src="upload_cloud.svg" alt="upload"/>
                        <input
                            className="input-zone"
                            {...getInputProps()}

                        />
                      
                        <p className="dropzone-content">
                            {isDragActive?"Release to drop the files here":"Drag your file here"}
                        </p>
                        <DefaultButton
                            color="var(--color-blue-light)"
                            textColor="white"
                            borderColor="var(--color-blue-light)"
                            className="mb-3"
                        >
                            Select file to upload
                        </DefaultButton>
                        <DefaultButton
                            color="var(--color-blue-light)"
                            textColor="white"
                            borderColor="var(--color-blue-light)"
                            onClick={()=>setAnalyzeClose(true)}
                            className="close-btn"
                        >
                            <Icon name="close"/>
                        </DefaultButton>
                    </div>
                ))}
                <div className="tab-header w-100 mb-2">
                    <ul className="d-flex justify-content-end">
                        {tabMenuList.map((tab)=>(
                            <li
                                className={"d-flex"+(tab_menu===tab.key?" active":"")}
                                key={"tab_menu_item_"+tab.key}
                                onClick={()=>setTabMenu(tab.key)}    
                            >
                                {tab.text}
                            </li>
                        ))}
                    </ul>
                </div>
                {tab_menu!=="analyze"&&(
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
                        <span>total results: {loading==="tracks"?"...":trackSearch.pagination.total}</span>
                    </div>
                </div>
                )}
                <div className="content-body">
                    {loading!==""?(
                        <div className="loading-widget">
                            <div className="logo-img">
                                <img src={icon} alt="loading"/>
                                <div className="loading-text">
                                    Loading ...
                                </div>
                            </div>
                        </div>
                    ):(
                        tab_menu==="tracks"?(
                            trackSearch.list.map((item:any, index:number)=>(
                            <div className="row-item mb-3" key={"item_"+index}>
                                <div className="item-header d-flex justify-content-between">
                                    <div className="d-flex flex-column">
                                        <span className="title">{item.title}</span>
                                        <span className="description">Published: {moment(item.update_time).format("DD/MM/YYYY")} by John</span>
                                    </div>
                                    <DefaultButton onClick={handleAnalyze}>Analyze</DefaultButton>
                                </div>
                                <div>
                                Drow an interface of a widget in a full accordance with its technical description. The functionality of widget must contain a search field (search by image), price comparison and a wallet.
                                </div>
                                <div className="d-flex justify-content-between item-bottom">
                                    <div className="d-flex align-items-end" style={{color: 'grey'}}>
                                        124 views
                                    </div>
                                    <div className="d-flex mb-2 mt-3">
                                        <div id="itunes_block" className="portal_block">
                                            <Link to="https://itunes.apple.com/us/album/id192617001?i=192617043&amp;at=1l3vri7&amp;app=itunes" target="_blank">
                                                <img src="Apple_icon.png" alt="Apple"/>
                                            </Link>
                                        </div>
                                        <div id="amazon_block" className="portal_block">
                                            <Link to="http://www.amazon.com/dp/B000QNQ4HY/?tag=cugate-20" target="_blank">
                                                <img src="Amazon_icon.png" alt=""/>
                                            </Link>
                                        </div>
                                        <div id="spotify_block" className="portal_block">
                                            <Link to="https://open.spotify.com/track/32DrfMiPy6UdPuuKqgS4Lk" target="_blank">
                                                <img src="Spotify_icon.png" alt=""/>
                                            </Link>
                                        </div>
                                        <div id="deezer_block" className="portal_block">
                                            <Link to="http://www.deezer.com/track/786698" target="_blank">
                                                <img src="Deezer_icon.png" alt=""/>
                                            </Link>
                                        </div>
                                        <div id="cuview_block" className="portal_block">
                                            <Link to="https://cumarket.net/ytb/t-6-1" target="_blank">
                                                <img src="Cugate_icon.png" alt=""/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        ):tab_menu==="albums"?(
                            <>Albums Developing...</>
                        ):tab_menu==="artists"?(
                            <>Artists Developing...</>
                        ):tab_menu==="stations"?(
                            <>Stations Developing...</>
                        ):tab_menu==="analyze"?(
                            <div id="ajaxContentRow" dangerouslySetInnerHTML={{__html: uploadedFileDiv}}></div>
                        ):(<></>)
                    )}
                    {loading===""&&(
                    <div
                        className="row d-flex justify-content-center mt-4 mb-4"
                    >
                        <div style={{width: '200px',textAlign:'center'}}>
                            <DefaultButton
                                color="white"
                                textColor="var(--color-blue-light)"
                                borderColor="var(--color-blue-light)"
                                className={"mb-3 me-3"+(tab_menu==="tracks"&&trackSearch.pagination.page<trackSearch.pagination.pages-1?"":" display-none")}
                                disabled={trackSearch.pagination.page>=trackSearch.pagination.pages-1}
                                onClick={()=>handleMore()}
                            >
                                {moreLoading?(
                                    <Icon name="loading"/>
                                ):(
                                    "More"
                                )}
                            </DefaultButton>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};
