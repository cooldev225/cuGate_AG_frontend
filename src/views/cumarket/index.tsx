import "../../assets/scss/cumarket.scss";
import img_caption from '../../assets/images/cumarket/caption.png';
import { Inprocess } from "../../components";

export const CumarketPage: React.FC = () => {
    return (
        <div className={"page page-cumarket"}>
            <div className="caption">
                <img src={img_caption} alt="caption"/>
            </div>
            <div id="albums_frame">
                <div className="row special_carousel" id="albums_group_22">
                    <div className="col-6 col-lg-4 px-0">
                        <img src="https://www.cumarket.net/img/new_home_design/charts_pic.png" alt=""/>
                        <div id="charts_title">
                            <span style={{color:'#fecc00'}}>2022/</span><span>09/19</span>
                        </div>
                    </div>
                    <div className="col-6 col-lg-8 px-0">
                        <div id="charts_collapserow" className="text-right">
                            <a id="charts_collapsebtn" data-toggle="collapse" href="#more_charts_wrapper" role="button" aria-expanded="false" aria-controls="more_charts_wrapper">
                                <img src="https://www.cumarket.net/img/new_home_design/plus_button.png" alt=""/>
                            </a>
                        </div>
                        <div id="charts_wrapper" className="d-flex flex-wrap justify-content-between">
                            <div className="albums_carousel-block">
                                <div className="order-section">1</div>
								<div className="albums_carousel-img" style={{backgroundImage: "url('http://img.cugate.com/?o=member&amp;i=186279&amp;s=174&amp;mt=2&amp;mg=0')"}}>           
								    <div id="loading_img_22_1750241" className="loading-img" style={{backgroundImage: "url('https://www.cumarket.net//img/loading2.gif');"}}>

                                    </div>
								</div>
								<span className="albums_carousel-title" title="INFINITY">INFINITY</span>
								<div className="albums_carousel-artist-title" title="Jaymes Young">
								    <a href="https://www.cumarket.net/artist/186279i0i1750241">Jaymes Young</a>
								</div>
							</div>
                        </div>
                        <div className="albums_carousel-block">
                            <div className="order-section">19</div>
                            <div className="albums_carousel-img" style={{backgroundImage: "url('http://img.cugate.com/?o=member&amp;i=108383&amp;s=174&amp;mt=1&amp;mg=1');"}}>
                                <div id="loading_img_22_1589213" className="loading-img" style={{backgroundImage: "url('https://www.cumarket.net//img/loading2.gif');"}}></div>
                            </div>
                            <span className="albums_carousel-title" title="BLINDING LIGHTS">BLINDING LIGHTS</span>
                            <div className="albums_carousel-artist-title" title="The Weeknd">
                                <a href="https://www.cumarket.net/artist/108383i0i1589213">The Weeknd</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Inprocess/>
            </div>
        </div>
    );
};