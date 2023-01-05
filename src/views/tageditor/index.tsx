import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AutoComplete } from "antd";

import { Form, InputGroup, Button } from "react-bootstrap";
import { DefaultButton, Icon } from "../../components/widgets";
import icon from '../../assets/images/icon-cugate.svg';

import { tabMenuList, genreList, explicitContentList, distributionTerrList, performerRoleList } from "./contents";
import "../../assets/scss/tageditor.scss";
// import { getGenres } from "../../actions/user";
import { getSearchTrackList, getSearchAlbumList, getSearchTrackTitleList, getSubGenre, getPerformerList, createTrack } from "../../actions/user";
import moment from "moment";

// interface TrackFormDataType {
//     title: string;
//     genre: string;
// };
export const TagEditorPage: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const [trackTitleSearchList, setTrackTitleSearchList] = useState<any[]>([]);
    const [subGenreList, setSubGenreList] = useState<any[]>([]);
    const [performerList, setPerformerList] = useState<any[]>([
        {
            member_title: '_11-PLEJ-SEASONS-ESC',
            member_id: '0',
            role_id: '4',
            primary: 'true'    
        }
    ]);

    const [performerRoles, setPerformerRoles] = useState<any[]>([])
    // useEffect(() => {
    //     if (loading) return;
    //     if (searchGenre !== "" && !formData.genre.filter((g: any) => g === searchGenre).length) {
    //         let list = formData.genre;
    //         list.push(searchGenre);
    //         setFormData({ ...formData, genre: list });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [searchGenre]);
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
    const [trackSearch, setTrackSearch] = useState<any>(defaultDataList);
    const [albumSearch, setAlbumSearch] = useState<any>(defaultDataList);
    const [languages, setLanguages] = useState<Array<{
        id: string;
        title?: string;
    }>>([]);
    useEffect(() => {
        if (loading !== false) return;
        if (activeTab === 0) {
            if (activeMenu === 0) {
                if (trackSearch.isLoaded) return;
                setLoading(true);
                getSearchTrackList({
                    pagination: trackSearch.pagination,
                    filter: formData
                }).then((data) => {
                    setLoading(false);
                    data.result.isLoaded = true;
                    setTrackSearch(data.result);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            } else if (activeMenu === 1) {
                if (albumSearch.isLoaded) return;
                setLoading(true);
                getSearchAlbumList({
                    pagination: albumSearch.pagination,
                    filter: formData
                }).then((data) => {
                    setLoading(false);
                    data.result.isLoaded = true;
                    setAlbumSearch(data.result);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, activeMenu]);
    // getGenres().then((data) => {
    //     setGenreList(data.result);
    // });
    const [formData, setFormData] = useState<any>({
        trackTitle : "",
        genre: 0,
        mood: [],
        activity: [],
        season: [],
        region: "all",
        station: [],
        keyword: "",
        sort_by: "played_ranking",
        language : 0,
        explicitContent : 0,
        catalogueNumber : null,
        distributionTerr : [],
        lyrics : "",
        trackPart : "",
        instPossibleVal : 0,
        subGenre : 0,
        publisher : "",
        circleP : "",
        startOfPreview : "",
        trackType : null,
        yearOfPublish: moment().format("YYYY-MM-DD"),
        titleLanguage : 0,
        priceCode : "",
        ISRC : "",
        releaseDate : moment().format("YYYY-MM-DD"),
        performers : [
            {
                cnt : 0,
                member_title: '_11-PLEJ-SEASONS-ESC',
                member_id: '0',
                role_id: '4',
                primary: 'true'    
            }
        ]

    });
    const generateIsrc = () => {
        var randomNumbers = Math.floor(1000 + Math.random() * 9000);
        var year = moment(formData.yearOfPublish, "YYYY-MM-DD").year();
        return 'DEB79' + year + '9' + randomNumbers;
    }
    const getFormDataFromPostData = ( inData:any ) => {
        // inData;
    }
    const getPostDataFromFormData = ( inData:any ) => {
        let res = {
            track_title: formData.trackTitle,
            track_part: formData.trackPart,
            track_type: formData.trackType,
            instrumental: formData.instPossibleVal,
            isrc: formData.ISRC,
            genre_id: formData.genre,
            fileunder_id: formData.subGenre,
            title_lang_id: formData.titleLanguage,
            lyrics_lang_id: formData.language,
            publishers: formData.publisher,
            price_code: formData.priceCode,
            explicit_content: formData.explicitContent,
            circle_p: formData.circleP,
            publication_date: formData.yearOfPublish,
            catalogue: formData.catalogueNumber,
            start_of_preview: formData.startOfPreview,
            release_date: formData.releaseDate,
            distribution_territories: formData.distributionTerr,
            lyrics: formData.lyrics,
            members: formData.performers,
            update_performers: (formData.performers.length > 2)
        }
        return res;
    }
    const handleActiveMenu = (key: number) => {
        setActiveMenu(key);
        setActiveTab(0)
    }
    const getLanguages = (genre : string) => {
        return [
            {
                "id": "123",
                "title": "Doo Wop"
            },
            {
                "id": "124",
                "title": "Funk"
            },
            {
                "id": "125",
                "title": "Gospel"
            },
            {
                "id": "126",
                "title": "Hip Hop"
            },
            {
                "id": "127",
                "title": "Motown"
            }
        ]
    }

    const handleMore = () => {
        if (loading !== false) return;
        if (activeTab === 0) {
            // track and album list
            if (activeMenu === 0) {
                // track list
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
            } else if (activeMenu === 1) {
                // album list
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
        }
        if (activeMenu === 0 && activeTab === 0) {
        }
    }

    const saveNewTrackSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        console.log("form submit");
        event.preventDefault();
        console.log(formData)
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setLoading(true);
            /*
            {
                action: 2, // fixed value
                track_title: 'Bionic Breakthrough - Title Screen',
                track_part: 'sdaf',
                track_type: 'original',
                instrumental: '0',
                isrc: 'DEB792398500',
                genre_id: 7,
                fileunder_id: 281, sub genre
                title_lang_id: 13,
                lyrics_lang_id: 31,
                publishers: 'asdf',
                price_code: 'afsdf',
                explicit_content: 0,
                circle_p: 'asdf',
                publication_date: '2023-01-12',
                catalogue: 'das',
                start_of_preview: 'asdf',
                release_date: '2023-01-03',
                distribution_territories: "106, 104",
                lyrics: 'adfasdf',
                members: [
                  {
                    member_title: '_11-PLEJ-SEASONS-ESC',
                    member_id: '0',
                    role_id: '4',
                    primary: 'true'
                  },
                  {
                    member_title: ' Peter Alexander',
                    member_id: '370469',
                    role_id: '74',
                    primary: 'false'
                  }
                ],
                update_performers: 1
              }
              */
            let response = await createTrack(getPostDataFromFormData(formData));
            setLoading( false )
            console.log( response );
        }
    };

    const handleTrackTitleSearch = async (value: any) => {
        setLoading( true );
        let res: any[] = [];
        if(value.length >= 2) {
            let response = await getSearchTrackTitleList({
                keyword: value
            });
            let arr: any[] = [];
            for (let i = 0; i < response.length; i++) {
                const trackItem = response[i];
                if(arr.findIndex((item)=>item.value==trackItem.value) < 0){
                    arr.push(trackItem);
                } 
            }
            res = arr.map((item: any)=> {
                return {
                    label : (
                        <div>
                        <b>{item.label.track_title}</b>
                        { item.label.track_part ? (
                            <span> / {item.label.track_part}</span>
                            ) : (
                                <span></span>
                            )
                        }
                        <span> / {item.label.artist}</span>
                        { item.label.genre_title ? (
                            <span> / {item.label.genre_title}</span>
                            ) : (
                                <span></span>
                            )
                        }
                        { item.label.clientTitle ? (
                            <span style={{ 'color':'#0099FF' }}> / {item.label.clientTitle}</span>
                            ) : (
                                <span></span>
                            )
                        }
                        <span> / {item.label.genre_title}</span>
                        </div>
                    ),
                    value : item.value,
                }
            })
            console.log( res );
        }
        setTrackTitleSearchList(res);
        setLoading( false );
    };

    const addPerformer = () => {
        let newPerformers = formData.performers;
        for(let i = 0; i < newPerformers.length; i++) {
            newPerformers[i].cnt = i;
        }
        newPerformers.push({
            cnt : newPerformers.length,
            member_title: '',
            member_id: '0',
            role_id: '0',
            primary: 'false' 
        })
        setFormData( {...formData, performers:newPerformers} );
    }  

    const deletePerformer = (cnt:number) => {
        console.log( cnt )
        let newPerformers = [];
        for(let i = 0; i < formData.performers.length; i++) {
            if(formData.performers[i].cnt != cnt) newPerformers.push(formData.performers[i]);
        }
        for(let i = 0; i < newPerformers.length; i++) {
            newPerformers[i].cnt = i;
        }
        setFormData( {...formData, performers:newPerformers} );
    }
    
    return (
        <div className="page page-profile page-tageditor uk-container-large mt-5 row">
            <div className="col-3 left-menu">
                <ul>
                    {tabMenuList.map((menu, index) => (
                        <li
                            key={index}
                            className={"mb-1 " + (index === activeMenu ? "active" : "")}
                            onClick={() => handleActiveMenu(index)}
                        >
                            <Link to={""}>{menu.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-9 content-wrapper">
                <div className="tab-header w-100 mb-2">
                    <ul className="nav nav-tabs nav-bordered">
                        {tabMenuList[activeMenu].tabs.map((tab, index) => (
                            <li className="nav-item"
                                key={index}
                                onClick={() => setActiveTab(index)}
                            >
                                <Link
                                    to={'#'}
                                    data-bs-toggle="tab"
                                    aria-expanded="false"
                                    className={"nav-link" + (activeTab === index ? " active" : "")}>
                                    <i className="mdi mdi-home-variant d-md-none d-block"></i>
                                    <span className="d-none d-md-block">{tab.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {
                        activeTab === 0 &&
                        <div className="status-header">
                            <span>total results: {
                                loading !== false ? "..." :
                                    activeMenu === 0 ? trackSearch.pagination.total :
                                        activeMenu === 1 ? albumSearch.pagination.total : 0
                            }</span>
                        </div>
                    }
                </div>
                <div className="tab-content">
                    {
                        tabMenuList[activeMenu].tabs.map((item, index) =>
                            <div key={index} className={"tab-pane " + (activeTab === index ? 'active show' : '')}>
                                {
                                    activeMenu === 0 ? (
                                        activeTab === 0 ? (
                                            loading === true ? (
                                                <div className="loading-widget">
                                                    <div className="logo-img">
                                                        <img src={icon} alt="loading" />
                                                        <div className="loading-text">
                                                            Loading ...
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {trackSearch.list.map((item: any, index: number) => (
                                                        <div className="row-item mb-3" key={"item_" + index}>
                                                            <div className="item-header d-flex justify-content-between">
                                                                <div className="d-flex flex-column">
                                                                    <span className="title">{item.media}<span></span></span>
                                                                    <span className="description">Published: {item.lastUpdated} by: {item.artist}</span>
                                                                </div>
                                                                {/* <DefaultButton
                                                                        className="small-button"
                                                                        color="white"
                                                                        textColor="var(--color-blue-light)"
                                                                        borderColor="var(--color-blue-light)"
                                                                        onClick={() => { }}
                                                                    >
                                                                        View
                                                                    </DefaultButton> */}
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="d-flex item-album w-100">
                                                                    <img src={`https://img.cugate.com/?i=${item.albumId}&o=member`} alt="" />
                                                                    <div className="ms-2 item-album-title w-100">
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
                                                                                {item.file_info.f_track_type_title || 'Unkown'}
                                                                            </div>
                                                                            <div className="ms-4">
                                                                                <span className="me-1">Time:</span>
                                                                                {item.file_info.f_track_time / 1000 || 0}s
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
                                                </>
                                            )
                                        ) : (
                                            <Form
                                                noValidate
                                                className='mt-3'
                                                validated={validated}
                                                onSubmit={saveNewTrackSubmit}
                                            >
                                                {/* <Form.Label className="d-flex justify-content-left mb-2">
                                                        <h3>General</h3>
                                                    </Form.Label> */}
                                                <div className="row mb-4">
                                                    <Form.Group className="col-12">
                                                        <Form.Label>Track Title</Form.Label>
                                                        <AutoComplete
                                                            style={{ width: "100%" }}
                                                            onSearch={handleTrackTitleSearch}
                                                            onChange={(value) => {
                                                                    setFormData({ ...formData, trackTitle: value});
                                                                }
                                                                
                                                            }
                                                            onSelect={(value, option) => {
                                                                    setFormData({ ...formData, trackTitle: value});
                                                                }
                                                            }
                                                            placeholder="Input title here"
                                                            options={trackTitleSearchList}
                                                            // value={formData.trackTitle}
                                                        />
                                                        {/* <AutoComplete
                                                            width={"100%"}
                                                            items={trackTitleSearchList}
                                                            itemKeyProperty={"value"}
                                                            itemLabelProperty={"label"}
                                                            value={formData.trackTitle}
                                                            onChange={(value)=>{
                                                                console.log( value )
                                                            }}
                                                            // disabled={loading !== ""}
                                                            borderColor="var(--color-blue-light)"
                                                        /> */}
                                                    </Form.Group>

                                                    
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Genre</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.genre}
                                                            onChange={(e) => {
                                                                    setFormData({ ...formData, genre: e.target.value});
                                                                    setLanguages(getLanguages(e.target.value));
                                                                }
                                                            }
                                                        >
                                                            {genreList.map(({ key, text }) => (<option value={key}>{text}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Lyrics Language</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.language}
                                                            onChange={async (e) => {
                                                                setFormData({ ...formData, language: e.target.value })
                                                                setLoading( true )
                                                                let response = await getSubGenre(e.target.value)
                                                                setLoading( false )
                                                                setSubGenreList( response )
                                                            }}
                                                        >
                                                            {languages.map(({ id, title }) => (<option value={id}>{title}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Explicit content</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.explicitContent}
                                                            onChange={(e) => setFormData({ ...formData, explicitContent: e.target.value })}
                                                        >
                                                            {explicitContentList.map(({ key, text }) => (<option value={key}>{text}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Catalogue Number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            value={formData.catalogueNumber}
                                                            onChange={(e) => setFormData({ ...formData, catalogueNumber: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-12">
                                                        <Form.Label>Distribution territories </Form.Label>
                                                        {/* <Multiselect
                                                            options={this.state.options} // Options to display in the dropdown
                                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                            onSelect={this.onSelect} // Function will trigger on select event
                                                            onRemove={this.onRemove} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        /> */}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Track Part</Form.Label>
                                                        <Form.Control
                                                            required
                                                            value={formData.trackPart}
                                                            onChange={(e) => setFormData({ ...formData, trackPart: e.target.value })}
                                                        >
                                                            
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out Track Part.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Instrumental Possible values</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.instPossibleVal}
                                                            onChange={(e) => setFormData({ ...formData, instPossibleVal: e.target.value })}
                                                        >
                                                            {explicitContentList.map(({ key, text }) => (<option value={key}>{text}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>SubGenre</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.subGenre}
                                                            onChange={(e) => setFormData({ ...formData, subGenre: e.target.value })}
                                                        >
                                                            {subGenreList.map(({ id, title }) => (<option value={id}>{title}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Publishers</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            value={formData.publishers}
                                                            onChange={(e) => setFormData({ ...formData, publishers: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Circle P</Form.Label>
                                                        <Form.Control
                                                            required
                                                            value={formData.circleP}
                                                            onChange={(e) => setFormData({ ...formData, circleP: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Start of Preview</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            value={formData.startOfPreview}
                                                            onChange={(e) => setFormData({ ...formData, startOfPreview: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Track Type</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.trackType}
                                                            onChange={(e) => setFormData({ ...formData, trackType: e.target.value })}
                                                        >
                                                            {["Original", "Karaoke", "Medley", "Cover"].map((typeItem) => (<option value={typeItem.toLocaleLowerCase()}>{typeItem}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Year of Publication</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            value={formData.yearOfPublish}
                                                            onChange={(e) => setFormData({ ...formData, yearOfPublish: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Title Language</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.titleLanguage}
                                                            onChange={(e) => setFormData({ ...formData, titleLanguage: e.target.value })}
                                                        >
                                                            {languages.map(({ id, title }) => (<option value={id}>{title}</option>))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Price Code</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            value={formData.priceCode}
                                                            onChange={(e) => setFormData({ ...formData, priceCode: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>ISRC</Form.Label>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                required
                                                                value={formData.ISRC}
                                                                onChange={(e) => setFormData({ ...formData, ISRC: e.target.value })}
                                                                
                                                            />
                                                            {/* <Form.Control
                                                            placeholder="Recipient's username"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            /> */}
                                                            <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                                                                setFormData({ ...formData, ISRC: generateIsrc() })
                                                            }}>
                                                                {/* <i className={"fas fa-sync-alt"}></i> */}
                                                            </Button>
                                                        </InputGroup>
                                                        
                                                            
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Release Date</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            value={formData.releaseDate}
                                                            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="row mb-4">
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Add lyrics</Form.Label>
                                                        <textarea
                                                            className="form-control"
                                                            value={formData.lyrics}
                                                            rows={5}
                                                            required
                                                            onChange={(e) => {setFormData({ ...formData, lyrics: e.target.value });}}
                                                        />
                                                        {/* <Form.Text
                                                            value={formData.explicitContent}
                                                            onChange={(e) => setFormData({ ...formData, explicitContent: e.target.value })}
                                                        >
                                                            {explicitContentList.map(({ key, text }) => (<option value={key}>{text}</option>))}
                                                        </Form.Text> */}
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Performers <img src="https://te.cugate.com/img/add.png" alt="" onClick={addPerformer}/></Form.Label>
                                                        <div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Performer</th>
                                                                        <th>Role</th>
                                                                        <th>Primary</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        formData.performers.map((performer:any)=>(
                                                                            <tr>
                                                                                <td>
                                                                                    <Form.Control size="sm" value={performer.member_title} onChange={(e)=>{
                                                                                        let arr = formData.performers;
                                                                                        arr[performer.cnt].member_title = e.target.value;
                                                                                        setFormData( {...formData, performers:arr} )
                                                                                    }}>

                                                                                    </Form.Control>
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Select size="sm" value={performer.role_id} onChange={(e)=>{
                                                                                        let arr = formData.performers;
                                                                                        arr[performer.cnt].role_id = e.target.value;
                                                                                        setFormData( {...formData, performers:arr} )
                                                                                    }}>
                                                                                        {
                                                                                            performerRoleList.map((performerRoleItem:any)=>(
                                                                                                <option value={performerRoleItem.id}>{performerRoleItem.value}</option>
                                                                                            ))
                                                                                        }
                                                                                        
                                                                                    </Form.Select>
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Check value={performer.primary}  onChange={(e)=>{
                                                                                        let arr = formData.performers;
                                                                                        arr[performer.cnt].primary = e.target.value;
                                                                                        setFormData( {...formData, performers:arr} )
                                                                                    }}></Form.Check>
                                                                                </td>
                                                                                <td>
                                                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSISDSZ0J3TPL2f4YbluKRFhKY8BWDFiHBwCg&usqp=CAU" alt="close" width={30} onClick={() => {
                                                                                        deletePerformer(performer.cnt)
                                                                                    }} />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out last name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <DefaultButton type="submit" loading={loading}>Save</DefaultButton>
                                                </div>
                                            </Form>
                                        )
                                    ) : (
                                        activeTab === 0 ? (
                                            loading === true ? (
                                                <div className="loading-widget">
                                                    <div className="logo-img">
                                                        <img src={icon} alt="loading" />
                                                        <div className="loading-text">
                                                            Loading ...
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {albumSearch.list.map((item: any, index: number) => (
                                                        <div className="row-item mb-3" key={"item_" + index}>
                                                            <div className="item-header d-flex justify-content-between">
                                                                <div className="d-flex flex-column">
                                                                    <span className="title">{item.media}<span></span></span>
                                                                    <span className="description">Published: {item.lastUpdated} by: {item.artist}</span>
                                                                </div>
                                                                {/* <DefaultButton
                                                                                className="small-button"
                                                                                color="white"
                                                                                textColor="var(--color-blue-light)"
                                                                                borderColor="var(--color-blue-light)"
                                                                                onClick={() => { }}
                                                                            >
                                                                                View
                                                                            </DefaultButton> */}
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="d-flex item-album w-100">
                                                                    <img src={`https://img.cugate.com/?i=${item.albumId}&o=member`} alt="" />
                                                                    <div className="ms-2 item-album-title w-100">
                                                                        <div className="d-flex description mt-4">
                                                                            <div className={item.rank + "," + item.lastRank}>
                                                                                <span className="me-1">Rank:</span>
                                                                                {item.lastRank == null || item.rank < item.lastRank ? (
                                                                                    <span className="color-green">{item.rank}<Icon name="arrow-up" /></span>
                                                                                ) : (
                                                                                    <span className="color-red">{item.rank}<Icon name="arrow-down" /></span>
                                                                                )}
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
                                                </>
                                            )
                                        ) : (
                                            <div>New Album</div>
                                        )
                                    )

                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};