import './Home.css';
import {Link} from "react-router-dom";




const Edit: React.FC = () => {
    return(
        <div>
            <div className="title">
            <p className="line">Make</p>
            <p className="line">A</p>
            <p className="line">Wish</p>
        </div>

        <div className='edit'>
            {/* <Link to="/"><button>
                Edit Gesture
            </button></Link> */}
            
            <button>
                Edit Sound
            </button>
        
        </div>

        </div>
        
    )

}


export default Edit;