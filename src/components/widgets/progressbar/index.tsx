import "../../../assets/scss/widgets/progressbar.scss";
import { ProgressBar } from "react-bootstrap";


export const Progressbar: React.FC = () => {

    return (
        <div className="progress-bar">
            <ProgressBar animated now={100} />
        </div>
    );
};

export default Progressbar;
