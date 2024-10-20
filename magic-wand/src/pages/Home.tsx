import React, { useState, useEffect, useRef } from 'react';
import { IonButton } from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useUnlockContext } from '../UnlockContext'; // Import the context

const Home: React.FC = () => {
  const [isInSequenceDetectionState, setIsInSequenceDetectionState] = useState(false);
  
  // Access the unlock word from context
  const { unlockWord, setWordMatched } = useUnlockContext();

  // Speech recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Ref to track the timeout ID
  const timeoutIdRef = useRef<number | null>(null);

  const waitForSound = () => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Browser doesn't support speech recognition.");
      return;
    }

    // Reset transcript and word matching state
    resetTranscript();
    setWordMatched(false);

    // Enter the sequence detection state
    setIsInSequenceDetectionState(true);

    // Start listening for speech
    SpeechRecognition.startListening();

    // Stop listening after 5 seconds if unlock word is not detected
    timeoutIdRef.current = window.setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsInSequenceDetectionState(false);
    }, 5000);
  };

  useEffect(() => {
    if (transcript && isInSequenceDetectionState) {
      const wordToCheck = transcript.toLowerCase();
      console.log(`detected sound: ${wordToCheck}`);
      if (wordToCheck === unlockWord) {
        // Found a match to the unlock word
        console.log("Unlock word detected!");
        setWordMatched(true);

        // Clear the timeout since we found a match
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }

        // Stop listening and exit detection state
        SpeechRecognition.stopListening();
        setIsInSequenceDetectionState(false);
      }
    }
  }, [transcript, isInSequenceDetectionState, unlockWord, setWordMatched]);

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
            <IonButton onClick={ waitForSound }>Unlock</IonButton>
            <Link to="/edit" style={{ textDecoration: 'none' }}>
              <IonButton>Edit</IonButton>
            </Link>
          </>
        )}
      </div>

      <div className='body'></div>
    </div>
  );
};

export default Home;
