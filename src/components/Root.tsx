import { Navigate } from 'react-router-dom';

const Root = () => {
    const getRootUrl = () => {
        let url: string = 'cugate';

        return url;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;
