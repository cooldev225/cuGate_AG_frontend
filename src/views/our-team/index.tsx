import { Fragment } from "react";
import { teamList } from "./contents";
import { motion } from "framer-motion";

export const OurTeamPage: React.FC = () => {
    return (
        <Fragment>
            <section className="-uk-section uk-section-default">
                <div className="uk-container uk-container-large">
                    <h1 className="uk-heading-medium uk-text-primary uk-margin-large-top">
                        Our Team
                    </h1>
                </div>
            </section>
            {teamList.map((teammate, tidx) => (
                <section key={tidx} className="uk-section uk-section-default" style={{backgroundColor: `var(${teammate.color2})`}}>
                    <div className="uk-container uk-container-large">
                        <h2 className="uk-text-capitalize d-flex">
                            <span className="uk-text-bold me-2" style={{color: `var(${teammate.color1})`}}> CuGate </span> 
                            <div dangerouslySetInnerHTML={{__html: teammate.title}}></div>
                        </h2>
                        <div className="uk-grid uk-child-width-1-2@s uk-grid-row-large uk-margin-large">
                            {teammate.person.map((person, pidx) => (
                                <div key={`${tidx}-${pidx}`} className={'uk-grid-margin'+(pidx%2===0?' uk-first-column':'')}>
                                    <div className="uk-grid uk-flex-center" uk-grid>
                                        <div className="uk-width-1-2 uk-width-1-3@m uk-first-column">
                                            <motion.div className="uk-border-circle" style={{border: `3px solid var(${teammate.color3})`}}
                                                initial="hidden"
                                                whileInView="visible"
                                                transition={{ duration: 0.7 }}
                                                variants={{ hidden: {scale: 0.2},visible: {scale: 1},}}
                                            >
                                                <img className="uk-border-circle" style={{border: `5px solid white`}} src={`team/${person.avatar}`} alt={person.name}/>
                                            </motion.div>
                                        </div>
                                        <div className="uk-width-2-3@m">
                                            <motion.h3 className="uk-text-capitalize uk-text-bold uk-margin-remove"
                                                initial="hidden"
                                                whileInView="visible"
                                                transition={{ duration: 1.5 }}
                                                variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                                            >
                                                { person.name }
                                            </motion.h3>
                                            <motion.h4 className="uk-text-capitalize uk-margin-remove"
                                                initial="hidden"
                                                whileInView="visible"
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                                variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                                            >
                                                <i> { person.role } </i>
                                            </motion.h4>
                                            <motion.p className=""
                                                initial="hidden"
                                                whileInView="visible"
                                                transition={{ duration: 0.8, delay: 0.7 }}
                                                variants={{ hidden: {opacity: 0,x: 100},visible: {opacity: 1,x: 0},}}
                                            >
                                                { person.description }
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
            
        </Fragment>
        
    );
};