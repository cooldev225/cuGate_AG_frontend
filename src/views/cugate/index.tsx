import "../../assets/scss/cugate.scss";
import images from '../../assets/images/cugate';
import { SplashPage } from "../splash";
import React, { useLayoutEffect,useEffect,useState, useRef } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../types/models/store";
import { Header } from "../../components";
import { featureList, menuList, officeList } from "./contents";
import { motion } from "framer-motion";
export const CugatePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user,mobilemenu_toggle } = useSelector((state:StoreState) => state.auth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMounted = useRef(true);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const handleLoading = () => {
    setIsLoading(false);
  }

  function updateSize() {
    setIsMobile(window.innerWidth<1024);
  }
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  useEffect(()=>{
    window.addEventListener("load",handleLoading);
    setIsMobile(window.innerWidth<1024);
    if(isMounted.current) {
      setIsLoading(false)
    }
    return () => {
      isMounted.current = false;
      window.removeEventListener("load",handleLoading);
    }
  },[]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return isLoading ? (
    <SplashPage />
  ):(
    <div className={"page page-cugate"+(isMobile?" mobile-size":"")+(mobilemenu_toggle?" offcanvas-menu":"")}>
      <Header/>
      <section className={"-uk-section uk-section-default uk-visible@l "+(scrollPosition>80?"uk-sticky":"")}>
        <div className="uk-container uk-container-large">
          <div className="cg-menu">
            <ul className="uk-grid uk-grid-small uk-flex-between" uk-scrollspy-nav="closest: li; scroll: true; offset: 107">
              {
                menuList.map((value,index)=>(
                  <li className={activeItem===index?"uk-first-column uk-active":""} key={index}>
                    <a href={"#"+value.href} onClick={()=>setActiveItem(index)} className="uk-link-reset uk-margin-medium-top uk-margin-medium-bottom uk-display-inline-block" uk-scroll="offset: 107">
                      <span className="uk-text-bold uk-text-secondary uk-text-uppercase">
                        {value.text}
                      </span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </section>
      
      {/*About Us*/}
      <section id="about-us" className="uk-section uk-section-default">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-grid-large -uk-child-width-1-2@m uk-flex-middle" uk-height-viewport="offset-top: true">
            <div className="uk-flex-last@m uk-width-3-5@m">
              <div className="uk-position-relative">
                <img src={images[0]} className="" uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 600; repeat: 0" />
                <img src={images[1]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-down; delay: 900; repeat: 0" />
                <img src={images[2]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 1200; repeat: 0" />
              </div>
            </div>

            <motion.div className="uk-width-2-5@m" animate={{opacity: 1,}}>
              <div className="uk-panel" uk-scrollspy="target: > *; cls: uk-animation-slide-right-medium; delay: 300">
                <motion.h2 className="uk-heading-medium uk-text-primary" animate={{}} transition={{ duration: 1 }}>
                  About Us
                </motion.h2>
                <p className="uk-margin-medium uk-text-large">
                  Cugate AG is a German big data company that was founded by music producer and manager Hanspeter ”Memo” Rhein.
                </p>
                <p className="uk-margin-medium">
                  The primary goal is to support the general change in the media business from haptic to virtual sales and business processes,
                  to secure business areas with a worldwide patented solution <strong> CUGATE’s VIRTUAL BARCODE </strong>
                  (the global, unique non-intrusive media operating & management development) to make the newly created point of sales and monetary structures & solutions manageable, as well as to implement these goals in a virtual, global and unrestricted marketplace.
                </p>
                <p className="read-more uk-scrollspy-inview -right-medium">
                  <a href="#" className="uk-button uk-button-default uk-button-large" uk-toggle="target: #about-us .read-more">Read More</a>
                </p>
                <div className="read-more" hidden>
                  <p>
                    Our unique (MOS) (Media Operating System) solution helps to secure new business areas and to make the point of sales and monetary structures & solutions manageable and usable. We are already successfully implementing this approach in several pilot projects.
                  </p>
                  <p>
                    We have been developing and optimizing our worldwide patented fingerprinting and watermarking technology for almost 20 years. There are already proven and scalable solutions for radio and TV monitoring with an associated calculation of the license fees to be paid in real time, an AI-supported system for the sync and license area and third-party advertisement solutions for TV and video sales. Further application systems are under development.
                  </p>
                  <p>
                    Musicians, scientists, producers, artists and music publishers around the world have contributed to the creation of the CUGATE solutions. The result is a solution tailored to all sales and marketing processes in the film and music industry. In recent years, Memo Rhein has been able to put together an excellent team which is unparalleled in terms of experience and expertise, with offices in Berlin, the USA, Georgia and China.
                  </p>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/*The Cugate Music Catalogue*/}
      <section id="the-cugate-music-catalogue" className="-uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-background-primary uk-light uk-padding-large uk-padding-remove-horizontal">
            <div className="uk-grid uk-grid-large uk-child-width-1-2@m uk-flex-middle">
              <div className="uk-first-column">
              <div className="uk-position-relative">
                <img src={images[3]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 600; repeat: 0" />
                <img src={images[4]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 900; repeat: 0" />
                <img src={images[5]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 1200; repeat: 0" />
              </div>
              </div>

              <div className="">
                <div className="uk-panel uk-margin-medium-left uk-margin-remove-left@m uk-margin-medium-right" uk-scrollspy="target: > *; cls: uk-animation-slide-right-medium; delay: 300;">

                  <h2 className="uk-heading-medium">
                    The Cugate Music Catalogue
                  </h2>
                  <p className="uk-margin-medium">
                    Cugate AG holds the rights to a vast catalog of music and is still producing and releasing new music.
                    The Cugate Label Group consist of four labels for physical releases
                    (Cugate Classics for Classical recordings, Clásicos Latinos
                    (for music from Latin America, Kintsugi Recordings for Neoclassical music and Memo Music for everything else).
                    Apart from that we run several other labels for digital distribution only.
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/*Watermark & Footprint*/}
      <section id="watermark-footprint" className="uk-section uk-section-default">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-4@m uk-flex-middle">
            <div className="uk-first-column">
              <div className="uk-position-relative uk-width-2-3 uk-width-1-1@m uk-margin-auto">
                <img src={images[6]} className="" uk-scrollspy="cls: uk-animation-scale-up; delay: 300; repeat: 0" />
                <img src={images[7]} className="uk-position-cover" uk-parallax="x:-40,40" />
                <img src={images[8]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-fade; delay: 900; repeat: 0" />
              </div>
            </div>

            <div>
              <div className="uk-panel">
                <h2 className="uk-h1 uk-text-primary">
                  Watermark
                </h2>
                <p className="uk-margin-medium uk-text-small">
                  A specific hashcode gets converted to an audio signal in the psychoacoustic frequency range and is written into the data itself.
                  These codes are stored in a blockchain and can be used to trigger all kinds of actions.
                  Our decoder which currently exists as a standalone application and an extension
                  for browsers can extract the codes and trigger the event or action that has been assigned to it beforehand.
                </p>

              </div>
            </div>

            <div>
              <div className="uk-position-relative uk-width-2-3 uk-width-1-1@m uk-margin-auto">
                <img src={images[9]} className="" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" />
                <img src={images[10]} className="uk-position-cover" uk-parallax="x:-40,40" />
                <img src={images[11]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-fade; delay: 1200; repeat: 0" />
              </div>
            </div>

            <div>
              <div className="uk-panel">

                <h2 className="uk-h1 uk-text-primary">
                  Footprint
                </h2>
                <p className="uk-margin-medium uk-text-small">
                  During the fingerprinting process the audio or video file (A/V) is analyzed using 96 different parameters.
                  The information gets collected in a small file, the so-called „fingerprint”.
                  The signal itself is not being altered (-{'>'} passive processing).
                  With a software developed by Cugate we are now able to match a A/V-file
                  with a database of fingerprints and so to identify it and to compare the properties of the files to filter out similarities or specific relations.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/*Stakeholders*/}
      <section id="stakeholders" className="uk-section uk-section-secondary">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-grid-large uk-child-width-1-2@m uk-flex-middle">
            <div className="uk-first-column">
              <div className="uk-position-relative">
                <img src={images[12]} className="" uk-scrollspy="cls: uk-animation-scale-down; delay: 600; repeat: 0" />
                <img src={images[13]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-fade; delay: 900; repeat: 0" />
                <img src={images[14]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 1200; repeat: 0" />
              </div>
            </div>

            <div className="">
              <div className="uk-panel" uk-scrollspy="target: > *; cls: uk-animation-slide-right-medium; delay: 300;">

                <h2 className="uk-heading-medium uk-text-primary">
                  Stake&shy;holders
                </h2>
                <p className="uk-margin-medium">
                  All of our solutions have been developed in close consultation with the planet's most
                  important collecting societies, music publishers, distributors and artists.
                  It is important to us to remain in constant communication with all our stakeholders to ensure
                  all-encompassing and state-of-the-art solutions that leave nothing to be desired.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/*Products & Services*/}
      <section id="products-services" className="uk-section uk-section-default">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-grid-large uk-child-width-1-2@m uk-flex-top">
            <div className="uk-flex-last@m">
              <div className="uk-position-relative">
                <img src={images[15]} className="" uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 600; repeat: 0" />
                <img src={images[16]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 900; repeat: 0" />
                <img src={images[17]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 1200; repeat: 0" />
              </div>
            </div>
            <div className="uk-first-column">
              <div className="uk-panel" uk-scrollspy="target: > *; cls: uk-animation-slide-right-medium; delay: 300;">
                <h2 className="uk-heading-medium uk-text-primary">
                  Products & Services
                </h2>
                <h3 className="" id="service-digital-distribution">
                  1. Digital Distribution
                </h3>
                <p className="uk-scrollspy-inview -right-medium">
                  Cugate Soundsoul is a global digital music aggregator and already one of the world‘s largest distributors for classical music. Instead of a closed-off B2B system with intransparent accounting we offer direct access to data and analytics for artists and offer support and tutorials. APIs to all major portals and the most important collecting societies guarantee international rights management. Cugate Soundsoul will become the central hub that also can be utilized for additional distribution channels.
                </p>
                <p className="uk-scrollspy-inview -right-medium">
                  <a href="#" className="uk-button uk-button-default" uk-toggle="target: #modal">Sign up today!</a>
                </p>
                <h3 className="uk-scrollspy-inview -right-medium" id="service-radio-monitoring">
                  2. Radio Monitoring
                </h3>

                <p className="uk-scrollspy-inview -right-medium">
                  Since 2017, we are monitoring the most important radio stations on a global scale and are able to prove the radio play of musical works thanks to our fingerprinting technology. Our system computes the royalties that have to be paid out by the collecting societies to the artists in real time (currently only for Germany). Through station profiling we are gathering precious data for marketing purposes. This system was installed in Shenzhen, China in cooperation with the Shenzhen Copyright Association for administrative use in 2019.

                  Our consumer-facing radio app (soon to be released) will use this data to create a fully immersive radio experience that will connect radio stations, listeners, artists and advertisers like never before.
                </p>

                <p className="uk-scrollspy-inview -right-medium">
                  <a href="#" className="uk-button uk-button-default" uk-toggle="target: #modal">Sign up today!</a>
                </p>

                <h3 className="uk-scrollspy-inview -right-medium" id="service-sync-licensing">
                  3. CuSync
                </h3>

                <p className="uk-scrollspy-inview -right-medium">
                  Licensing music to movies and advertisements has become a very important revenue stream for musicians and publishers. With our CuSync-system we are able to offer access to this as of now exclusive market for everyone who is interested.
                </p>

                <p className="uk-scrollspy-inview -right-medium">
                  <a href="#" className="uk-button uk-button-default" uk-toggle="target: #modal">Sign up today!</a>
                </p>

                <h3 className="uk-scrollspy-inview -right-medium" id="service-cuspace">
                  4. CuSpace
                </h3>

                <p className="uk-scrollspy-inview -right-medium">
                  With CuSpace, artists are able to create their own website and promote all their sales-, streaming- and distribution links to their social media outlets.
                </p>

                <p className="uk-scrollspy-inview -right-medium">
                  <a href="#" className="uk-button uk-button-default" uk-toggle="target: #modal">Sign up today!</a>
                </p>

                <h3 className="uk-scrollspy-inview -right-medium" id="service-blockchain">
                  5. NFT
                </h3>

                <p className="uk-scrollspy-inview -right-medium">
                  Since we are integrating Blockchain into our rights management system we will be able to generate NFTs for our artists.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/*We cover everything*/}
      <section id="we-cover-everything" className="uk-section uk-section-primary">
        <div className="uk-container uk-container-large">
          <h2 className="uk-heading-medium uk-text-center uk-text-secondary uk-margin-large">
            We cover everything
          </h2>
          <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-flex-center" uk-scrollspy="target: > *; cls: uk-animation-slide-bottom-medium; delay: 300;">
            {
              featureList.map((value,index)=>(
              <div className={"uk-first-column uk-grid-margin uk-scrollspy-inview"+(index%3==0?" -bottom-medium":"")} key={index}>
                <div className="uk-grid uk-flex-center uk-flex-middle">

                  <div className="uk-width-1-2 uk-width-1-3@m uk-width-1-4@l">
                    <img src={images[value.img_index]} style={{maxWidth:'80px'}} alt="" />
                  </div>
                  <div className="uk-width-1-1 uk-width-2-3@m uk-width-3-4@l">
                    <h3 className="uk-margin-remove">
                      {value.text}
                    </h3>
                  </div>

                </div>
              </div>
              ))
            }
          </div>
        </div>
      </section>
      
      {/*We are global*/}
      <section id="we-are-global" className="uk-section uk-section-secondary">
        <div className="uk-container -uk-container-large">
          <h2 className="uk-heading-medium uk-text-center uk-text-secondary uk-margin-remove">
            We are global
          </h2>

          <p className="uk-test-large uk-text-center uk-text-bold uk-text-secondary uk-margin-medium-top uk-margin-large-bottom">
            Get in touch with our offices
          </p>

          <p className="uk-text-center uk-margin-large">
            <img src={images[27]} useMap="#weareglobal-image-map" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 300;"/>
            <map name="weareglobal-image-map">
              {
                officeList.map((value,index)=>(
                  <area key={index} target="_blank" alt={value.gmail} title={value.gmail} href={'mailto:'+value.gmail} coords={value.coords} shape="rect"></area>  
                ))
              }
            </map>
          </p>

        </div>
      </section>

      {/*We are successful*/}
      <section id="we-are-successful" className="uk-section uk-section-default">
        <div className="uk-container uk-container-large">
          <h2 className="uk-heading-medium uk-text-center uk-text-secondary uk-margin-large">
            We are successful
          </h2>

          <div className="uk-grid uk-grid-large cg-grid-large uk-child-width-1-4@m -uk-flex-middle">
            <div className="">
              <div className="uk-panel uk-text-center">

                <div className="uk-position-relative uk-width-2-3 uk-width-1-1@m uk-margin-auto">
                  <img src={images[28]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 300; repeat: 0" />
                  <img src={images[29]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" />
                  <img src={images[30]} className="uk-position-cover" uk-parallax="x:-30,30" />
                </div>
                <h3 className="uk-h1 uk-text-primary uk-margin-remove-bottom">
                  7 153
                </h3>
                <p className="uk-margin-remove">
                  own albums
                </p>

              </div>
            </div>

            <div className="">
              <div className="uk-panel uk-text-center">

                <div className="uk-position-relative uk-width-2-3 uk-width-1-1@m uk-margin-auto">
                  <img src={images[31]} className="" uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 300; repeat: 0" />
                  <img src={images[32]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" />
                  <img src={images[33]} className="uk-position-cover" uk-parallax="x:-30,30" />
                </div>
                <h3 className="uk-h1 uk-text-primary uk-margin-remove-bottom">
                  12 205
                </h3>
                <p className="uk-margin-remove">
                  artists
                </p>

              </div>
            </div>

            <div className="">
              <div className="uk-panel uk-text-center">

                <div className="uk-position-relative uk-width-2-3 uk-width-1-1@m uk-margin-auto">
                  <img src={images[34]} className="" uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 300; repeat: 0" />
                  <img src={images[35]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" />
                  <img src={images[36]} className="uk-position-cover" uk-parallax="x:-30,30" />
                </div>
                <h3 className="uk-h1 uk-text-primary uk-margin-remove-bottom">
                  31 449
                </h3>
                <p className="uk-margin-remove">
                  own tracks
                </p>

              </div>
            </div>

            <div className="">
              <div className="uk-panel uk-text-center">

                <div className="uk-position-relative uk-width-2-3 uk-width-1-1@m uk-margin-auto">
                  <img src={images[37]} className="" uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 300; repeat: 0" />
                  <img src={images[38]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" />
                  <img src={images[39]} className="uk-position-cover" uk-parallax="x:-30,30" />
                </div>
                <h3 className="uk-h1 uk-text-primary uk-margin-remove-bottom">
                  14 416 663
                </h3>
                <p className="uk-margin-remove">
                  controlled tracks
                </p>

              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};