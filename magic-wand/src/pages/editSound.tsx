import { Link } from "react-router-dom";
import Back from "../images/back.png";
import './Home.css';

const editSound: React.FC = () => {
    return(
        <div>
            <div>
                <Link to="/edit">
                    <img src={Back} width={50} height={50} className="back"/>
                    
                </Link>
            </div>
        </div>

        
    )
        
    

}

export default editSound;