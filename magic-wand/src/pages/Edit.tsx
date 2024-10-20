import './Home.css';
import {Link} from "react-router-dom";
import {IonButton} from '@ionic/react';





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
            <Link to="/editGesture" style={{ textDecoration: 'none' }}>
                <IonButton>Edit Gesture</IonButton>
            </Link>
            
            <Link to="/editSound" style={{ textDecoration: 'none' }}>
                <IonButton>Edit Sound  </IonButton>
            </Link>
        
        </div>

        </div>
        
    )

}


export default Edit;