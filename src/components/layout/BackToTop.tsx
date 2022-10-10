import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const BackToTop = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Link
            className={classNames('btn', 'btn-soft-primary', 'shadow-none', 'btn-icon', 'btn-back-to-top', scrollPosition>100?'show':'')}
            id="btn-back-to-top"
            to="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up icon-xxs"><g><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></g></svg>
        </Link>
    );
};

export default BackToTop;
