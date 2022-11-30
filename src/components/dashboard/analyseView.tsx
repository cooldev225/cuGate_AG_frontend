import React from "react";
import { Link } from "react-router-dom";
import "../../assets/scss/components/dashboard/analyseView.scss";
export const AnalyseView: React.FC<any> = (props) => {
    const {
        data={},
    } = props.data;
  return (
    <div id="ajaxContentRow">
        <div id="resultsSectionHeader">
            <span className="darkblue">Search</span>
            <span className="lightblue">Result</span>
        </div>
        {data&&data.id3_always&&(
        <div className="cont-wrapper" id="mainResultsContWrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="searchResults">
                            <div className="result-main">
                                <div className="res-wrapper">
                                    <Link className="album-url" to={"https://www.cumarket.net/album/" + data.id3_always.album_id}>
                                        <img className="album-cover" src={"https://img.cugate.com/?o=album&i="+data.id3_always.album_id+"&s=300&uu=11"} alt=""/>
                                    </Link>
                                    <div className="res-info">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="res-info-main">
                                                    <div className="d-flex flex-column justify-content-center position-absolute">
                                                        <div className="track-matchpercent">
                                                            <span className="num">100</span>
                                                            <span className="perc">%</span>
                                                        </div>
                                                        <div className="track-searchtype">ID3</div>
                                                    </div>
                                                    <div className="track-title-members">
                                                        <div className="track-title d-inline-block">
                                                            <Link target="_blank" to={"https://www.cumarket.net/track/"+data.id3_always.track_id+"i"+data.id3_always.album_id}>{data.id3_always.track_title}</Link>
                                                            <Link to={"https://te.cugate.com/?act=track_culink&ref=tracks&ids="+data.id3_always.track_id+";&tracksnum=1&album_id="+data.id3_always.album_id+"&link_type=Extra+Link"} target="_blank">
                                                                <img src="cugate_logo_blue_24.png" style={{width: '20px;', marginLeft: '5px;'}} alt=""/>
                                                            </Link>
                                                        </div>
                                                        <div className="track-members">
                                                            <div className="art-link-wrapper">
                                                                <Link to={"https://www.cumarket.net/artist/"+data.id3_always.track_artists.member_id+"i0i"+data.id3_always.album_id} target="_blank">{data.id3_always.track_artists.member_title+data.id3_always.track_artists.member_role}</Link>
                                                                <Link to={"https://www.merchbar.com/search?q=&quot;"+data.id3_always.track_artists.member_title+"&quot;"} target="_blank">
                                                                    <img src="merchbar_logo.png" width="16" alt=""/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="track-portal-links">
                                                    <div id="itunes_block" className="portal_block">
                                                        <Link to="https://itunes.apple.com/ru/album/id480179704?i=480179705&amp;at=1l3vri7&amp;app=itunes" target="_blank">
                                                            <div className="portal_img" style={{backgroundImage: "url('/statics/images/youtube_mon/Apple_icon.png');"}}></div>
                                                        </Link>
                                                    </div>
                                                    <div id="amazon_block" className="portal_block">
                                                        <Link to="https://amazon.de/music/player/albums/B00A2WNZJY?marketplaceId=A1PA6795UKMFR9&amp;musicTerritory=DE&amp;ref=dm_sh_rYzm8lmJImGZWLsdOqQHxv7Vn&amp;trackAsin=B00A2WNZXK" target="_blank">
                                                            <div className="portal_img" style={{backgroundImage: "url('/statics/images/youtube_mon/Amazon_icon.png');"}}></div>
                                                        </Link>
                                                    </div>
                                                    <div id="spotify_block" className="portal_block">
                                                        <Link to="https://open.spotify.com/track/0xQxIdksJKWa6vEUrFXOpy" target="_blank">
                                                            <div className="portal_img" style={{backgroundImage: "url('/statics/images/youtube_mon/Spotify_icon.png');"}}></div>
                                                        </Link>
                                                    </div>
                                                    <div id="deezer_block" className="portal_block">
                                                        <Link to="http://www.deezer.com/track/14893478" target="_blank">
                                                            <div className="portal_img" style={{backgroundImage: "url('/statics/images/youtube_mon/Deezer_icon.png');"}}></div>
                                                        </Link>
                                                    </div>
                                                    <div id="cuview_block" className="portal_block">
                                                        <Link to="https://cumarket.net/ytb/t-1260898-106261" target="_blank">
                                                            <div className="portal_img" style={{backgroundImage: "url('/statics/images/youtube_mon/Cugate_icon.png');"}}></div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="track_playbar">
                                                    <img className="small_playbtn_img" src="/statics/images/play_button.svg" alt=""/>
                                                    <audio preload="auto" className="track_preview_audio" data-audio-id="main"
                                                        src="https://prelistening.cugate.com/?i=1258759&l=-1">
                                                    </audio>
                                                    <input type="range" className="audio_bar main_bar" max="100" value="0"/>
                                                </div>
											</div>
											<div className="col-4">
												<div className="track-position" data-audio-id="main">
													00:00:00
                                                </div>
											</div>
                                        </div>
                                    </div>
                                    <div id="waveformWrapper">
                                        <div id="waveCont">
                                            <div id="wave_first"></div>
                                            <div id="wave_second"></div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center text-white">
                                            <div className="w-50">
                                                <div className="track_playbar">
                                                    <span>Original: </span>
                                                    <img className="small_playbtn_img" alt="" src="/statics/images/play_button.svg" />
                                                    <audio preload="auto" className="track_preview_audio" data-audio-id="wavesurfer_one">
                                                    </audio>
                                                    <input type="range" className="audio_bar main_bar" max="100" value="0"/>
                                                    <div className="track-position" data-audio-id="wavesurfer_one" style={{marginLeft:"1.5rem;"}}>00:00:00</div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span>Scale: at least</span>
                                                <input type="number" id="zoomInput" min="1" max="1000" value="1" />
                                                <span>pixels/second</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="nav nav-tabs" id="monitoringTabs" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="radio-tab" data-bs-target="#tabRadioMonitoring" type="button" role="tab">
                                            <span>Radio Monitoring</span>
                                            <img className="tab_expand_btn" src="/statics/images/tab_expand_btn_blue.svg" alt=""/>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="youtube-tab" data-bs-target="#tabYoutubeMonitoring" type="button" role="tab">
                                            <span>Youtube Monitoring</span>
                                            <img className="tab_expand_btn" src="/statics/images/tab_expand_btn_white.svg" alt=""/>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="cont-wrapper" id="monitoringContWrapper">
                <div className="tab-content" id="monitoringTabContent">
                    <div className="tab-pane fade show active" id="tabRadioMonitoring" role="tabpanel" aria-labelledby="radio-tab">
                        <div id="radioMonitoringTabContent">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <iframe id="curadioFrame" title="curadioFrame" src="https://curadio.net/trackstats.action?slId=1260898&artist=Taio+Cruz&track=Hangover+%28feat.+Flo+Rida%29&disableLink=true&uu=67" frameBorder="0" style={{width:"979px;", height: "359px;", marginBottom: "4rem;"}}></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tabYoutubeMonitoring" role="tabpanel" aria-labelledby="youtube-tab">
                        <div id="youtubeTabContent">
                            <div className="video-in-tab">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="video_frame">
                                                <div className="player-iframe-wrapper">
                                                    <div id="wm_additional_info_container">
                                                        <a className="info-entry" target="_blank">
                                                            <img src="/statics/images/youtube_mon/WM1_icon.png" className="info-icon" />
                                                            <div className="info-wmnum"></div>
                                                            <div className="info-text"></div>
                                                        </a>
                                                    </div>
                                                    <div id="player"></div>
                                                    <div id="youkuPlayer"></div>
                                                </div>
                                                <div className="row" style={{margin: "2rem 0"}}>
                                                    <div className="col-12 col-md-2">
                                                        <div className="analysis-button-wrapper static">
                                                            <a id="analyze_button" className="analysis-loader disabled">
                                                                <span id="analyze_button_header">Analyze video</span>
                                                                <div className="loader1"></div>
                                                                <div className="loader2"></div>
                                                            </a>
                                                            <button className="btn-cancelanalysis"><i className="fas fa-stop-circle"></i></button>
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
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/copylink.svg" className="copylink-share-icon" alt="Copy Link"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/facebook.png" className="fb-share-icon" alt="Facebook"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/twitter.png" className="twitter-share-icon" alt="Twitter"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/pinterest.png" className="pinterest-share-icon" alt="Pinterest"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/linkedin.png" className="linkedin-share-icon" alt="LinkedIn"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/whatsapp.png" className="whatsapp-share-icon" alt="WhatsApp"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/viber.png" className="viber-share-icon" alt="Viber"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/email.png" className="email-share-icon" alt="Email"/>
                                                                    <img src="/statics/images/youtube_mon/cuview_share_icons/skype.png" className="skype-share-icon" alt="Skype"/>
                                                                </div>
                                                                <button className="btn btn-result" id="btn_cube_result"></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="yt-analyse-result">
                                <div className="container">
                                    <div className="cuview-analysis-result">
                                        <div className="cont-header">
                                            <h3>Results</h3>
                                            <div className="result-type-switch">
                                                <span className="btn-result" id="btn_yttext_result">Text</span>
                                                <span className="btn-result" id="btn_wm_result">Watermark</span>
                                                <span className="btn-result" id="btn_fp_result">Footprint</span>
                                            </div>
                                        </div>
                                        <div className="result-yttext">
                                            <div id="error_frame_yttext" className="error-frame"></div>
                                            <div className="res-wrapper">
                                                <a className="album-url">
                                                    <img className="album-cover" />
                                                </a>
                                                <div className="res-info">
                                                    <div className="res-info-main">
                                                        <div className="track-title d-inline-block"></div>
                                                        <div id="yttext_track_stats_but" className="stats_but" title="RMS Statistics for Track"></div>
                                                        <div className="track-members"></div>
                                                    </div>
                                                    <div className="track-portal-links">
                                                        <div id="playbtn_block" className="portal_block"></div>
                                                        <div id="itunes_block" className="portal_block"></div>
                                                        <div id="amazon_block" className="portal_block"></div>
                                                        <div id="youtube_block" className="portal_block"></div>
                                                        <div id="spotify_block" className="portal_block"></div>
                                                        <div id="rdio_block" className="portal_block"></div>
                                                        <div id="deezer_block" className="portal_block"></div>
                                                        <div id="extra_block" className="portal_block d-none"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-wm">
                                            <div id="error_frame_wm" className="error-frame"></div>
                                            <div className="res-wrapper">
                                                <a className="album-url">
                                                    <img className="album-cover" />
                                                </a>
                                                <div className="res-info">
                                                    <div className="res-info-main">
                                                        <div className="track-title d-inline-block"></div>
                                                        <div id="wm_track_stats_but" className="stats_but" title="RMS Statistics for Track"></div>
                                                        <div className="track-members"></div>
                                                    </div>
                                                    <div className="track-portal-links">
                                                        <div id="playbtn_block" className="portal_block"></div>
                                                        <div id="itunes_block" className="portal_block"></div>
                                                        <div id="amazon_block" className="portal_block"></div>
                                                        <div id="youtube_block" className="portal_block"></div>
                                                        <div id="spotify_block" className="portal_block"></div>
                                                        <div id="rdio_block" className="portal_block"></div>
                                                        <div id="deezer_block" className="portal_block"></div>
                                                        <div id="extra_block" className="portal_block d-none"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-fp">
                                            <div id="error_frame_fp" className="error-frame"></div>
                                            <div className="res-wrapper">
                                                <a className="album-url">
                                                    <img className="album-cover" />
                                                </a>
                                                <div className="res-info">
                                                    <div className="res-info-main">
                                                        <div className="track-title d-inline-block"></div>
                                                        <div id="fp_track_stats_but" className="stats_but"
                                                                title="RMS Statistics for Track">
                                                        </div>
                                                        <div className="track-members"></div>
                                                    </div>
                                                    <div className="track-portal-links">
                                                        <div id="playbtn_block" className="portal_block"></div>
                                                        <div id="itunes_block" className="portal_block"></div>
                                                        <div id="amazon_block" className="portal_block"></div>
                                                        <div id="youtube_block" className="portal_block"></div>
                                                        <div id="spotify_block" className="portal_block"></div>
                                                        <div id="rdio_block" className="portal_block"></div>
                                                        <div id="deezer_block" className="portal_block"></div>
                                                        <div id="extra_block" className="portal_block d-none"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="yt-cugate-services">
                                <div className="container">
                                    <div id="wm_cugate_services_container">
                                        <div className="cont-header">
                                            <h3><b>Cugate</b> Services</h3>
                                            <div className="showall-btn" id="wm_cugate_services_showall_btn" data-bs-toggle="collapse" ref="#wm_cugate_services_morecont">
                                                <span>Show all</span>
                                                <i className="far fa-plus-square"></i>
                                            </div>
                                        </div>
                                        <a className="service-entry" target="_blank">
                                            <img src="/statics/images/youtube_mon/WM1_icon.png" className="info-icon" />
                                            <div className="info-text">
                                                <div className="entry-title"></div>
                                            </div>
                                        </a>
                                        <div className="more-cont collapse" id="wm_cugate_services_morecont"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="yt-ft-similars">
                                <div className="container">
                                    <div className="result-similars">
                                        <div className="result-similars-header">
                                            <div>
                                                <span><b>CuSync</b> - Recommendations you might like</span>
                                            </div>
                                            <a id="youtube_similars_frame_collapsebtn" data-bs-toggle="collapse"
                                                href="#youtube_similars_morecont" role="button">
                                                <span>Show all</span>
                                                <i className="far fa-plus-square"></i>
                                            </a>
                                        </div>
                                        <div id="youtube_similars_frame">
                                            <div className="sim_block">
                                                <div className="sim_album_cover">
                                                    <a target="_blank">
                                                        <div className="sim_album_cover_bkgr"></div>
                                                    </a>
                                                </div>
                                                <div className="sim_text">
                                                    <div className="sim_track_title"><a target="_blank"></a></div>
                                                    <div className="sim_artist_title">
                                                        <span className="sim_atrist_by">by </span><a target="_blank"></a>
                                                    </div>
                                                    <div className="fp_moreinfo">
                                                        <div className="sim_number"></div>
                                                        <div className="fp_params fp_key"></div>
                                                        <div className="fp_params fp_mood"></div>
                                                    </div>
                                                    <div className="sim_play_row"></div>
                                                </div>
                                            </div>
                                            <div id="youtube_similars_morecont" className="collapse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="search-bar-in-tab">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="search_bar">
                                                <form action="#" id="vid_search_form" className="text-md-nowrap">
                                                    <div className="search-radiobutton-wrapper">
                                                        <div className="form-check custom-radio round-radio">
                                                            <input type="radio" id="searchTypeRadio_Normal" name="searchType" checked className="form-check-input" />
                                                            <label className="form-check-label" htmlFor="searchTypeRadio_Normal">Normal</label>
                                                        </div>
                                                        <div className="form-check custom-radio round-radio">
                                                            <input type="radio" id="searchTypeRadio_Topic" name="searchType" className="form-check-input" />
                                                            <label className="form-check-label" htmlFor="searchTypeRadio_Topic">Topics</label>
                                                        </div>
                                                    </div>
                                                    <div className="search-wrapper">
                                                        <input id="video_query" type="text" placeholder="Search" className="form-control" value="Hangover (feat. Flo Rida) - Taio Cruz"/>
                                                        <button type="button" className="btn-bigsearch" title="Search"><i className="fas fa-search"></i></button>
                                                    </div>
                                                    <div className="d-none" style={{float:"right", height:"20px;", textAlign:"right", marginLeft:"5px;", marginTop:"13px;"}}>
                                                        <span style={{fontSize:"0.9em;", paddingRight: "5px;", color: "#92929D;"}}>Autoplay</span>
                                                        <input type="checkbox" id="autoplay_checkbox" checked data-size="mini" data-inverse="false"/>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="apikey-container d-none">
                                                <label htmlFor="YTApiKeyInput" id="YTApiKeyLabel">YouTube API Key</label>
                                                <input id="YTApiKeyInput" type="text" placeholder="If this field is empty, default key will be used" className="form-control"/>
                                                <a target="_blank" href="https://www.youtube.com/watch?v=3jZ5vnv-LZc" id="YTApiKeyInstructions">How to obtain?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="yt-related-videos">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 py-4" id="related_videos_wrapper">
                                            <div className="cont-header">
                                                <h4 id="related_vids_cont_title">Related videos</h4>
                                                <div className="showall-btn d-none" id="related_vids_showall_btn" data-bs-toggle="collapse" ref="#related_vids_morecont">
                                                    <span>Show all</span>
                                                    <i className="far fa-plus-square"></i>
                                                </div>
                                            </div>
                                            <div id="search-container">
                                                <div id="related_vids_morecont" className="collapse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
		    </div>
            <div className="cont-wrapper" id="expandedTabWrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <ul className="nav nav-tabs" id="monitoringTabsExpanded" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="youtube-tab-expanded" data-bs-target="#tabYoutubeMonitoringExpanded" type="button" role="tab">
                                        <span>Youtube Monitoring</span>
                                        <img className="tab_expand_btn" src="/statics/images/tab_expand_btn_white.svg" alt=""/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cont-wrapper" id="expandedTabContWrapper">
                <div className="tab-pane fade show" id="tabYoutubeMonitoringExpanded" role="tabpanel"></div>
            </div> */}
        </div>
        )}
    </div>
  );
};

export default AnalyseView;
