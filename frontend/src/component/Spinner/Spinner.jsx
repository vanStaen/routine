import logoRoutine from "../../images/routine.svg";
import './Spinner.css';

export const Spinner = () => {
    return (<div className="spinner">
        <img src={logoRoutine} className="loader" alt="Loading" />
    </div>)
}   