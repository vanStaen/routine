import logoVenja from "../../images/venja.svg";
import './Spinner.css';

export const Spinner = () => {
    return (<div className="spinner">
        <img src={logoVenja} className="loader" alt="Loading" />
    </div>)
}   