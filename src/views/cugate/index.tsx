import "../../assets/scss/cugate.scss";
import images from '../../assets/images/cugate';
import { SplashPage } from "../splash";
import React, { useEffect,useState, useRef } from "react";
import { featureList, menuList, officeList } from "./contents";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const CugatePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [sectionTop, setSectionTop] = useState(menuList);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMounted = useRef(true);
  const [readMoreAbout, setReadMoreAbout] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    let current_pos = 0;
    menuList.map((value,index) => {
      if(value && value.top && position > value.top - 60) current_pos = index;
    });
    setActiveItem(current_pos);
  };

  const handleLoading = () => {
    setIsLoading(false);
  }

  useEffect(()=>{
    window.addEventListener("load",handleLoading);
    if(isMounted.current) {
      setIsLoading(false);
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

  useEffect(() => {
    if(!isLoading){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      menuList.map((value,index) => {
        let element = document.querySelector('#'+value.href);
        let rect = element?.getBoundingClientRect();
        sectionTop[index].top = rect?.top;
        setSectionTop([...sectionTop]);
        menuList[index].top = rect?.top;
      });
    }
  }, [isLoading]);

  const signup = () => {
    //
  };

  return isLoading ? (
    <SplashPage />
  ):(
    <div className={"page page-cugate"}>
      <section className={"menu-uk-section -uk-section uk-section-default uk-visible@l "+(scrollPosition>80?"uk-sticky":"")}>
        <div className="uk-container uk-container-large">
          <div className="cg-menu">
            <ul className="uk-grid uk-grid-small uk-flex-between" uk-scrollspy-nav="closest: li; scroll: true; offset: 107">
              {
                menuList.map((value,index)=>(
                  <li className={activeItem===index?"uk-first-column uk-active":""} key={index}>
                    <Link 
                      to={"#"+value.href} 
                        onClick={()=>{
                          setActiveItem(index); 
                          if(value.top!=undefined)
                            window.scrollTo({ top: value.top>=50 ? value.top - 50 : value.top, behavior: 'smooth' });
                        }}
                        className="uk-link-reset uk-margin-medium-top uk-margin-medium-bottom uk-display-inline-block"
                      >
                      <span className="uk-text-bold uk-text-secondary uk-text-uppercase">
                        {
                          //scrollPosition+'/'+sectionTop[index].top?.toFixed(0)
                        }
                        {
                          value.text
                        }
                      </span>
                    </Link>
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
                <motion.img alt="" src={images[0]} uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 600; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,x: 0,y: -100},visible: {opacity: 1,x: 0,y: 0},}}
                />
                <motion.img alt="" src={images[1]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-down; delay: 900; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {scale: 3},visible: {scale: 1},}}
                />
                <motion.img alt="" src={images[2]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 1200; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,x: -100},visible: {opacity: 1,x: 0},}}
                />
              </div>
            </div>

            <motion.div className="uk-width-2-5@m uk-grid-margin" animate={{opacity: 1,}}>
              <div className="uk-panel" uk-scrollspy="target: > *; cls: uk-animation-slide-right-medium; delay: 300">
                <motion.h2 
                  className="uk-heading-medium uk-text-primary" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0.2,x: 100,y: 0},visible: {opacity: 1,x: 0,y: 0},}}
                >
                  About Us
                </motion.h2>
                <motion.p className="uk-margin-medium uk-text-large"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  Cugate AG is a German big data company that was founded by music producer and manager Hanspeter ”Memo” Rhein.
                </motion.p>
                <motion.p className="uk-margin-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: .6 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  The primary goal is to support the general change in the media business from haptic to virtual sales and business processes,
                  to secure business areas with a worldwide patented solution <strong> CUGATE’s VIRTUAL BARCODE </strong>
                  (the global, unique non-intrusive media operating & management development) to make the newly created point of sales and monetary structures & solutions manageable, as well as to implement these goals in a virtual, global and unrestricted marketplace.
                </motion.p>
                <motion.p className="read-more uk-scrollspy-inview -right-medium" style={{display:readMoreAbout?'none':'block'}}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.9 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  <Link to={""} onClick={(e)=>{e.preventDefault();setReadMoreAbout(true);}} className="uk-button uk-button-default uk-button-large">Read More</Link>
                </motion.p>
                <motion.div className="read-more" style={{display:readMoreAbout?'block':'none'}}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  <p>
                    Our unique (MOS) (Media Operating System) solution helps to secure new business areas and to make the point of sales and monetary structures & solutions manageable and usable. We are already successfully implementing this approach in several pilot projects.
                  </p>
                  <p>
                    We have been developing and optimizing our worldwide patented fingerprinting and watermarking technology for almost 20 years. There are already proven and scalable solutions for radio and TV monitoring with an associated calculation of the license fees to be paid in real time, an AI-supported system for the sync and license area and third-party advertisement solutions for TV and video sales. Further application systems are under development.
                  </p>
                  <p>
                    Musicians, scientists, producers, artists and music publishers around the world have contributed to the creation of the CUGATE solutions. The result is a solution tailored to all sales and marketing processes in the film and music industry. In recent years, Memo Rhein has been able to put together an excellent team which is unparalleled in terms of experience and expertise, with offices in Berlin, the USA, Georgia and China.
                  </p>
                </motion.div>
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
                <motion.img alt="" src={images[3]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 600; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,x: -200},visible: {opacity: 1,x: 0},}}
                />
                <motion.img alt="" src={images[4]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 900; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,y: -200},visible: {opacity: 1,y: 0},}}
                />
                <motion.img alt="" src={images[5]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 1200; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1.6, delay: 0.5 }}
                  variants={{ hidden: {opacity: 0,y: 200},visible: {opacity: 1,y: 0},}}
                />
              </div>
              </div>
              <motion.div className=""
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.7 }}
                variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
              >
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
              </motion.div>
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
                <motion.img alt="" src={images[6]} className="" uk-scrollspy="cls: uk-animation-scale-up; delay: 300; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,scale: 0.2},visible: {opacity: 1,scale: 1},}}
                />
                <motion.img alt="" src={images[7]} className="uk-position-cover" uk-parallax="x:-40,40" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.7 }}
                  variants={{ hidden: {opacity: 0.5},visible: {opacity: 1},}}
                />
                <motion.img alt="" src={images[8]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-fade; delay: 900; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 1 }}
                  variants={{ hidden: {opacity: 0,},visible: {opacity: 1},}}
                />
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
                <motion.img alt="" src={images[9]} className="" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" 
                   initial="hidden"
                   whileInView="visible"
                   transition={{ duration: 1 }}
                   variants={{ hidden: {opacity: 0,scale: 0.2},visible: {opacity: 1,scale: 1},}}
                />
                <motion.img alt="" src={images[10]} className="uk-position-cover" uk-parallax="x:-40,40" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.7 }}
                  variants={{ hidden: {opacity: 0.5},visible: {opacity: 1},}}
                />
                <motion.img alt="" src={images[11]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-fade; delay: 1200; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 1 }}
                  variants={{ hidden: {opacity: 0,},visible: {opacity: 1},}}
                />
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
                <motion.img alt="" src={images[12]} className="" uk-scrollspy="cls: uk-animation-scale-down; delay: 600; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,scale: 1.5},visible: {opacity: 1,scale: 1},}}
                />
                <motion.img alt="" src={images[13]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-fade; delay: 900; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.6 }}
                  variants={{ hidden: {opacity: 0,},visible: {opacity: 1,},}}
                />
                <motion.img alt="" src={images[14]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 1200; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,x: -100},visible: {opacity: 1,x: 0},}}  
                />
              </div>
            </div>

            <motion.div className=""
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1 }}
              variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}} 
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/*Products & Services*/}
      <section id="products-services" className="uk-section uk-section-default">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-grid-large uk-child-width-1-2@m uk-flex-top">
            <div className="uk-flex-last@m">
              <div className="uk-position-relative">
                <motion.img alt="" src={images[15]} className="" uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 600; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1 }}
                  variants={{ hidden: {opacity: 0,y: -100},visible: {opacity: 1,y: 0},}}
                />
                <motion.img alt="" src={images[16]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 900; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1.2 }}
                  variants={{ hidden: {opacity: 0,scale: 0.3},visible: {opacity: 1,scale: 1},}}
                  
                />
                <motion.img alt="" src={images[17]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 1200; repeat: 0" 
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.6 }}
                  variants={{ hidden: {opacity: 0,},visible: {opacity: 1,},}}
                />
              </div>
            </div>
            <div className="uk-first-column">
              <div className="uk-panel" uk-scrollspy="target: > *; cls: uk-animation-slide-right-medium; delay: 300;">
                <motion.h2 className="uk-heading-medium uk-text-primary"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  Products & Services
                </motion.h2>
                <motion.h3 className="" id="service-digital-distribution"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  1. Digital Distribution
                </motion.h3>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  Cugate Soundsoul is a global digital music aggregator and already one of the world‘s largest distributors for classical music. Instead of a closed-off B2B system with intransparent accounting we offer direct access to data and analytics for artists and offer support and tutorials. APIs to all major portals and the most important collecting societies guarantee international rights management. Cugate Soundsoul will become the central hub that also can be utilized for additional distribution channels.
                </motion.p>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  <Link to={""} onClick={()=>signup()} className="uk-button uk-button-default">Sign up today!</Link>
                </motion.p>
                <motion.h3 className="uk-scrollspy-inview -right-medium" id="service-radio-monitoring"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  2. Radio Monitoring
                </motion.h3>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  Since 2017, we are monitoring the most important radio stations on a global scale and are able to prove the radio play of musical works thanks to our fingerprinting technology. Our system computes the royalties that have to be paid out by the collecting societies to the artists in real time (currently only for Germany). Through station profiling we are gathering precious data for marketing purposes. This system was installed in Shenzhen, China in cooperation with the Shenzhen Copyright Association for administrative use in 2019.
                  Our consumer-facing radio app (soon to be released) will use this data to create a fully immersive radio experience that will connect radio stations, listeners, artists and advertisers like never before.
                </motion.p>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  <Link to={""} onClick={()=>signup()} className="uk-button uk-button-default">Sign up today!</Link>
                </motion.p>
                <motion.h3 className="uk-scrollspy-inview -right-medium" id="service-sync-licensing"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  3. CuSync
                </motion.h3>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  Licensing music to movies and advertisements has become a very important revenue stream for musicians and publishers. With our CuSync-system we are able to offer access to this as of now exclusive market for everyone who is interested.
                </motion.p>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  <Link to={""} onClick={()=>signup()} className="uk-button uk-button-default">Sign up today!</Link>
                </motion.p>

                <motion.h3 className="uk-scrollspy-inview -right-medium" id="service-cuspace">
                  4. CuSpace
                </motion.h3>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  With CuSpace, artists are able to create their own website and promote all their sales-, streaming- and distribution links to their social media outlets.
                </motion.p>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  <Link to={""} onClick={()=>signup()} className="uk-button uk-button-default">Sign up today!</Link>
                </motion.p>
                <motion.h3 className="uk-scrollspy-inview -right-medium" id="service-blockchain"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  5. NFT
                </motion.h3>
                <motion.p className="uk-scrollspy-inview -right-medium"
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                >
                  Since we are integrating Blockchain into our rights management system we will be able to generate NFTs for our artists.
                </motion.p>
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
              <motion.div className={"uk-first-column uk-grid-margin uk-scrollspy-inview"+(index%3==0?" -bottom-medium":"")} key={index}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.5*index }}
                variants={{ hidden: {opacity: 0,y: 100},visible: {opacity: 1,y: 0},}}
              >
                <div className="uk-grid uk-flex-center uk-flex-middle">

                  <div className="uk-width-1-2 uk-width-1-3@m uk-width-1-4@l">
                    <motion.img src={images[value.img_index]} style={{maxWidth:'80px'}} alt="" />
                  </div>
                  <div className="uk-width-1-1 uk-width-2-3@m uk-width-3-4@l">
                    <h3 className="uk-margin-remove">
                      {value.text}
                    </h3>
                  </div>

                </div>
              </motion.div>
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
            <motion.img alt="" src={images[27]} useMap="#weareglobal-image-map" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 300;"
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0 }}
              variants={{ hidden: {opacity: 0,y: 100},visible: {opacity: 1,y: 0},}}
            />
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
                  <motion.img alt="" src={images[28]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 300; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,x: -100},visible: {opacity: 1,x: 0},}}
                  />
                  <motion.img alt="" src={images[29]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,scale: 0.3},visible: {opacity: 1,scale: 1},}}
                  />
                  <motion.img alt="" src={images[30]} className="uk-position-cover" uk-parallax="x:-30,30" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    variants={{ hidden: {opacity: 0},visible: {opacity: 1},}}
                  />
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
                <motion.img alt="" src={images[31]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 300; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,x: -100},visible: {opacity: 1,x: 0},}}
                  />
                  <motion.img alt="" src={images[32]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,scale: 0.3},visible: {opacity: 1,scale: 1},}}
                  />
                  <motion.img alt="" src={images[33]} className="uk-position-cover" uk-parallax="x:-30,30" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    variants={{ hidden: {opacity: 0},visible: {opacity: 1},}}
                  />
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
                <motion.img alt="" src={images[34]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 300; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,x: -100},visible: {opacity: 1,x: 0},}}
                  />
                  <motion.img alt="" src={images[35]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,scale: 0.3},visible: {opacity: 1,scale: 1},}}
                  />
                  <motion.img alt="" src={images[36]} className="uk-position-cover" uk-parallax="x:-30,30" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    variants={{ hidden: {opacity: 0},visible: {opacity: 1},}}
                  />
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
                <motion.img alt="" src={images[37]} className="" uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 300; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,x: -100},visible: {opacity: 1,x: 0},}}
                  />
                  <motion.img alt="" src={images[38]} className="uk-position-cover" uk-scrollspy="cls: uk-animation-scale-up; delay: 600; repeat: 0" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0 }}
                    variants={{ hidden: {opacity: 0,scale: 0.3},visible: {opacity: 1,scale: 1},}}
                  />
                  <motion.img alt="" src={images[39]} className="uk-position-cover" uk-parallax="x:-30,30" 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    variants={{ hidden: {opacity: 0},visible: {opacity: 1},}}
                  />
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