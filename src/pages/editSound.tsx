import { Link } from "react-router-dom";
import Back from "../images/back.png";
import './Home.css';
import './editSound.css';
import { IonButton, IonLabel } from "@ionic/react";

import { useUnlockContext } from "../UnlockContext";

const editSound: React.FC = () => {
    const { supportedWords, unlockWord, setUnlockWord } = useUnlockContext();

    return(
        <div>
            <div>
                <Link to="/edit">
                    <img src={Back} width={50} height={50} className="back"/>
                </Link>
                <div className='edit-page-content'>
                    <div className='selectedSoundContainer'>
                        <IonLabel>CURRENT SOUND</IonLabel>
                        <IonButton className="inactive sound-button">{unlockWord}</IonButton>
                    </div>
                    <div className='availableSoundsContainer'>
                        <IonLabel>AVAILABLE SOUNDS</IonLabel>
                        <div className='soundListContainer'>
                            {supportedWords.map((word, index) => (
                                <IonButton className="sound-button" key={index} onClick={() => {setUnlockWord(word)}}>
                                    {word}
                                </IonButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default editSound;
