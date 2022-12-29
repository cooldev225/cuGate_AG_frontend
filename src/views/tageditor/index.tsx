import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import { Form } from "react-bootstrap";
import { DefaultButton, Icon } from "../../components/widgets";
import icon from '../../assets/images/icon-cugate.svg';

import { tabMenuList, genreList } from "./contents";
import "../../assets/scss/tageditor.scss";
// import { getGenres } from "../../actions/user";
import { getSearchTrackList, getSearchAlbumList } from "../../actions/user";

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
        genre: [],
        mood: [],
        activity: [],
        season: [],
        region: "all",
        station: [],
        keyword: "",
        sort_by: "played_ranking",
    });
    const handleActiveMenu = (key: number) => {
        setActiveMenu(key);
        setActiveTab(0)
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
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setLoading(true);
            // await setUserInfo({
            //     is_profile: true,
            //     title: formData.title,
            //     last_name: formData.last_name,
            //     business_number: formData.contactor_number,
            // });
            // await getUserInfo().then((data) => {
            //     dispatchUser(data.result);
            //     setLoading(false);
            // });
            setTimeout(() => {
                setLoading(false)
                toast("successful saved!");
            }, 1000);
        }
    };

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
                                            <>
                                                {loading === true ? (
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
                                                )}
                                            </>
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
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Track Title</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={formData.title}
                                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please fill out first name.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className="col-6">
                                                        <Form.Label>Genre</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.genre}
                                                            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                                        >
                                                            {genreList.map(({ key, text }) => (<option value={key}>{text}</option>))}
                                                        </Form.Select>
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
                                            <>
                                                {loading === true ? (
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
                                                )}
                                            </>
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