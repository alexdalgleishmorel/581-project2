import './Home.css';
import { Link } from "react-router-dom";
import { IonButton } from '@ionic/react';
import Lock from "../images/Lock.png";

const Edit: React.FC = () => {
    return(
        <div>
            <div className="title">
            <p className="line">Make</p>
            <p className="line">A</p>
            <p className="line">Wish</p>
        </div>

        <div className='edit'>
            <Link to="/editGesture" style={{ textDecoration: 'none' }}>
                <IonButton>Edit Gesture</IonButton>
            </Link>
            
            <Link to="/editSound" style={{ textDecoration: 'none' }}>
                <IonButton>Edit Sound</IonButton>
            </Link>

            <Link to="/home">
                <img src={Lock} width={100} height={100}/>
            </Link>
        </div>

        </div>
        
    )

}


export default Edit;