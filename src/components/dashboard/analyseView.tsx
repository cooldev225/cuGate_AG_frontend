import React, { Fragment, useEffect, useState } from "react";
import "../../assets/scss/components/dashboard/analyseView.scss";
import WaveSurfer from "wavesurfer.js";
<script src="https://unpkg.com/wavesurfer.js"></script>
export const AnalyseView: React.FC<any> = (props) => {
    const {
        data = {},
    } = props.data;
    const [playing, setPlay] = useState(false);
    const [waveform, setWaveForm] = useState<any>();
    const [activeTab, setActiveTab] = useState("radio");

    useEffect(() => {
        if (data && data.id3_always) {
            setWaveForm(WaveSurfer.create({
                barWidth: 3,
                barRadius: 3,
                barGap: 2,
                barMinHeight: 1,
                cursorWidth: 1,
                container: "#waveform",
                backend: "WebAudio",
                height: 80,
                progressColor: "#FE6E00",
                // responsive: true,
                waveColor: "#C4C4C4",
                // cursorColor: "transparent"
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.url, props.data]);

    useEffect(() => {
        let track = document.querySelector("#track_player");
        if (waveform) waveform.load(track);
    }, [waveform]);

    useEffect(() => {
        if (waveform) {
            // waveform.playPause();
            if (playing) waveform.play();
            else waveform.pause();
        }
    }, [playing]);

    return (
        <div id="ajaxContentRow">
            <div id="resultsSectionHeader">
                <span className="darkblue">Search</span>
                <span className="lightblue">Result</span>
            </div>
            {data && data.id3_always && (
                <Fragment>
                    <div className="cont-wrapper" id="mainResultsContWrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="searchResults">
                                        <div className="result-main">
                                            <div className="res-wrapper">
                                                <a className="album-url" href={"https://www.cumarket.net/album/" + data.id3_always.album_id}>
                                                    <img className="album-cover" src={"https://img.cugate.com/?o=album&i=" + data.id3_always.album_id + "&s=300&uu=11"} alt="" />
                                                </a>
                                                <div className="res-info">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="res-info-main">
                                                                <div className="d-flex flex-column justify-content-center position-absolute">
                                                                    <div className="track-matchpercent">
                                                                        <span className="num">100</span>
                                                                        <span className="perc">%</span>
                                                                    </div>
                                                                    <div className="track-searchtype">{data.id3_always.search_type}</div>
                                                                </div>
                                                                <div className="track-title-members">
                                                                    <div className="track-title d-inline-block me-1">
                                                                        <a target="_blank" href={"https://www.cumarket.net/track/" + data.id3_always.track_id + "i" + data.id3_always.album_id} rel="noreferrer">
                                                                            {data.id3_always.track_title}
                                                                        </a>
                                                                        <a href={"https://te.cugate.com/?act=track_culink&ref=tracks&ids=" + data.id3_always.track_id + ";&tracksnum=1&album_id=" + data.id3_always.album_id + "&link_type=Extra+Link"} target="_blank" rel="noreferrer">
                                                                            <img src="cugate_logo_blue_24.png" style={{ width: '20px;', marginLeft: '5px;' }} alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="track-members">
                                                                        <div className="art-link-wrapper">
                                                                            <a href={"https://www.cumarket.net/artist/" + data.id3_always.track_artists.member_id + "i0i" + data.id3_always.album_id} target="_blank" rel="noreferrer">
                                                                                {data.id3_always.track_artists[0].member_title + data.id3_always.track_artists[0].member_role}
                                                                            </a>
                                                                            <a href={"https://www.merchbar.com/search?q=&quot;" + data.id3_always.track_artists[0].member_title + "&quot;"} target="_blank" rel="noreferrer">
                                                                                <img src="merchbar_logo.png" width="16" alt="" />
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="track-portal-links">
                                                                <div id="itunes_block" className="portal_block">
                                                                    <a href={data.id3_always.culinks.ITUNES?.url}>
                                                                        <img className="portal_img" src="Apple_icon.png" alt="" />
                                                                    </a>
                                                                </div>
                                                                <div id="amazon_block" className="portal_block">
                                                                    <a href={data.id3_always.culinks.AMAZON?.url} target="_blank" rel="noreferrer">
                                                                        <img className="portal_img" src="Amazon_icon.png" alt="" />
                                                                    </a>
                                                                </div>
                                                                <div id="spotify_block" className="portal_block">
                                                                    <a href={data.id3_always.culinks.SPOTIFY?.url} target="_blank" rel="noreferrer">
                                                                        <img className="portal_img" src="Spotify_icon.png" alt="" />
                                                                    </a>
                                                                </div>
                                                                <div id="deezer_block" className="portal_block">
                                                                    <a href={data.id3_always.culinks.DEEZER?.url} target="_blank" rel="noreferrer">
                                                                        <img className="portal_img" src="Deezer_icon.png" alt="" />
                                                                    </a>
                                                                </div>
                                                                <div id="cuview_block" className="portal_block">
                                                                    <a href={data.id3_always.culinks.CUVIEW?.url} target="_blank" rel="noreferrer">
                                                                        <img className="portal_img" src="Cugate_icon.png" alt="" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <img
                                                                className="small_playbtn_img focus"
                                                                src={(playing ? "pause" : "play") + "_button.svg"}
                                                                alt=""
                                                                onClick={() => setPlay(true)}
                                                            />
                                                            <div id="waveform" />
                                                            <audio id="track_player" src={props.url} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav nav-tabs" id="monitoringTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={"nav-link" + (activeTab === "radio" ? " active" : "")}
                                        onClick={() => setActiveTab("radio")}
                                        id="radio-tab" data-bs-target="#tabRadioMonitoring" type="button" role="tab"
                                    >
                                        <span>Radio Monitoring</span>
                                        <img className="tab_expand_btn" src={"tab_expand_btn_" + (activeTab === "radio" ? "blue" : "white") + ".svg"} alt="" />
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={"nav-link" + (activeTab === "youtube" ? " active" : "")}
                                        onClick={() => setActiveTab("youtube")}
                                        id="youtube-tab" data-bs-target="#tabYoutubeMonitoring" type="button" role="tab"
                                    >
                                        <span>Youtube Monitoring</span>
                                        <img className="tab_expand_btn" src={"tab_expand_btn_" + (activeTab === "youtube" ? "blue" : "white") + ".svg"} alt="" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {activeTab === "radio" && (
                        <div id="radioMonitoringTabContent">
                            <iframe
                                id="curadioFrame"
                                title="curadioFrame"
                                src={"https://curadio.net/trackstats.action?slId=" + data.id3_always.track_id + "&artist=" + data.id3_always.first_artist_safe + "&track=" + data.id3_always.track_title_safe + "&disableLink=true&uu=67"}
                                frameBorder="0"
                                style={{ width: "100%", height: "359px", marginBottom: "4rem" }}
                            ></iframe>
                        </div>
                    )}
                    {activeTab === "youtube" && (
                        <div id="youtubeTabContent">
                            <div className="video-in-tab">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="video_frame">
                                                <div className="player-iframe-wrapper">
                                                    <div id="wm_additional_info_container">
                                                        <a className="info-entry" href="#" target="_blank">
                                                            <img src="WM1_icon.png" className="info-icon" alt="" />
                                                            <div className="info-wmnum"></div>
                                                            <div className="info-text"></div>
                                                        </a>
                                                    </div>
                                                    <div id="player"></div>
                                                    <div id="youkuPlayer"></div>
                                                </div>
                                                <div className="row" style={{ margin: "2rem 0" }}>
                                                    <div className="col-12 col-md-2">
                                                        <div className="analysis-button-wrapper static">
                                                            <a id="analyze_button" className="analysis-loader disabled" href="#">
                                                                <span id="analyze_button_header">Analyze video</span>
                                                                <div className="loader1"></div>
                                                                <div className="loader2"></div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-10">
                                                        <div className="row">
                                                            <div className="col-12 col-md-9">
                                                                <div id="video_title"></div>
                                                            </div>
                                                            <div className="col-12 col-md-3">
                                                                <div id="analyze_time" className="text-start text-md-end"></div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-md-9">
                                                                <div id="video_author"><a href="#" target="_blank"></a></div>
                                                            </div>
                                                            <div className="col-12 col-md-3">
                                                                <div id="video_views" className="text-start text-md-end"></div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 text-end">
                                                                <div className="action-icons">
                                                                    <img src="copylink.svg" className="copylink-share-icon" alt="Copy Link" />
                                                                    <img src="facebook.png" className="fb-share-icon" alt="Facebook" onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u=https://cugate.online/")} />
                                                                    <img src="twitter.png" className="twitter-share-icon" alt="Twitter" onClick={() => window.open("https://twitter.com/intent/tweet?url=https://cugate.online/")} />
                                                                    <img src="pinterest.png" className="pinterest-share-icon" alt="Pinterest" onClick={() => window.open("https://pinterest.com/pin/create/button/?url=https://cugate.online/")} />
                                                                    <img src="linkedin.png" className="linkedin-share-icon" alt="LinkedIn" onClick={() => window.open("https://www.linkedin.com/shareArticle?mini=true&url=https://cugate.online/")} />
                                                                    <img src="whatsapp.png" className="whatsapp-share-icon" alt="WhatsApp" onClick={() => window.open("https://wa.me/?text=https%3A%2F%2Fcugate.online%2F")} />
                                                                    <img src="viber.png" className="viber-share-icon" alt="Viber" onClick={() => window.open("viber://forward?text=https%3A%2F%2Fcugate.online%2F")} />
                                                                    <img src="email.png" className="email-share-icon" alt="Email" />
                                                                    <img src="skype.png" className="skype-share-icon" alt="Skype" onClick={() => window.open("https://web.skype.com/share?url=https%3A%2F%2Fcugate.online%2F&source=button")} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {data && data.similars?.length && (
                        <Fragment>
                            <div className="col-12 py-4" id="silimar_videos_wrapper">
                                <div className="cont-header">
                                    <h4 id="silimar_vids_cont_title">similar videos</h4>
                                    <div className="showall-btn d-none" id="related_vids_showall_btn">
                                        <span>Show all</span>
                                        <i className="far fa-plus-square"></i>
                                    </div>
                                </div>
                                <div id="search-container">
                                    <div id="silimar_vids_morecont" className="collapse">
                                        {data && data.similars.map((video: any, index: number) => (
                                            <div key={index} className="col-6 item-card d-flex mt-2 mb-2">
                                                <a href={video.album.url}>
                                                    <img src={video.album.cover_url} alt="" />
                                                </a>
                                                <div className="ms-2">
                                                    <div className="d-flex">
                                                        <a href={video.album.url}>
                                                            <span>{video.album.title}</span>
                                                        </a>
                                                    </div>
                                                    <a href={video.album.track_url}>
                                                        <div>{video.track_title}</div>
                                                        <div>{video.track_time}</div>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </Fragment>
            )}
            <script src="/statics/youtube.js?uu=91"></script>
            <script type="text/javascript">
                alert();
            </script>
        </div>
    );
};

export default AnalyseView;
