import { Link } from "react-router-dom";
import Back from "../images/back.png";
import './Home.css';
import './editGesture.css';

import { IonLabel, IonButton } from "@ionic/react";
import { useUnlockContext } from "../UnlockContext";

const editGesture: React.FC = () => {
    const { supportedGestures, unlockGesture, setUnlockGesture } = useUnlockContext();

    return(
        <div>
            <div>
                <Link to="/581-project2/edit">
                    <img src={Back} width={50} height={50} className="back"/>    
                </Link>
                <div className='edit-page-content'>
                    <div className='selectedGestureContainer'>
                        <IonLabel>CURRENT GESTURE</IonLabel>
                        <IonButton className="inactive gesture-button">{unlockGesture}</IonButton>
                    </div>
                    <div className='availableGesturesContainer'>
                        <IonLabel>AVAILABLE GESTURES</IonLabel>
                        <div className='gestureListContainer'>
                            {supportedGestures.map((gesture, index) => (
                                <IonButton className="gesture-button" key={index} onClick={() => {setUnlockGesture(gesture)}}>
                                    {gesture}
                                </IonButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default editGesture;