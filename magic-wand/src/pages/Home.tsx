import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [isInSequenceDetectionState, setIsInSequenceDetectionState] = useState(false);

  const detectUnlockSequence = () => {
  };

  const handleUnlock = () => {
    setIsInSequenceDetectionState(true);

    detectUnlockSequence();

    // Exiting sequence detection state after 10 seconds
    setTimeout(() => {
      setIsInSequenceDetectionState(false);
    }, 10000);
  };

  return (
    <div>
      <div className="title">
        <p className="line">Make</p>
        <p className="line">A</p>
        <p className="line">Wish</p>
      </div>
      <div className='editHome'>
        {!isInSequenceDetectionState && (
          <>
            <IonButton onClick={handleUnlock}>Unlock</IonButton>
            <Link to="/edit" style={{ textDecoration: 'none' }}>
              <IonButton>Edit</IonButton>
            </Link>
          </>
        )}
      </div>

      <div className='body'>
        {/* Functionality to detect the sensors */}
      </div>
    </div>
  );
};

export default Home;
