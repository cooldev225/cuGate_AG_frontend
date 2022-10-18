import { Link } from "react-router-dom";
import "../../assets/scss/profile.scss";
export const ProfilePage: React.FC = () => {
    return (
        <div className="page page-profile uk-container-large mt-5">
            <div className="left-menu">
                <ul>
                    <li>
                        <Link to={""}>Persional Information</Link>
                    </li>
                    <li>
                        <Link to={""}>Favorites</Link>
                    </li>
                    <li>
                        <Link to={""}>Password</Link>
                    </li>
                    <li>
                        <Link to={""}>Notifications and Alerts</Link>
                    </li>
                    <li>
                        <Link to={""}>Membership Plan</Link>
                    </li>
                    <li>
                        <Link to={""}>Security</Link>
                    </li>
                    <li>
                        <Link to={""}>Account</Link>
                    </li>
                </ul>
            </div>
            <div className="content-wrapper">

            </div>
        </div>
    );
};