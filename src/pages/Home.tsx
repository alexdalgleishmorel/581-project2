import React, { useState, useEffect, useRef } from 'react';
import { IonButton } from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useUnlockContext } from '../UnlockContext';
import useGestureDetection from '../GestureCapture';

const Home: React.FC = () => {
  const [isInSequenceDetectionState, setIsInSequenceDetectionState] = useState(false);
  const [isDetectingGesture, setIsDetectingGesture] = useState(false);
  const [isWaitingForSound, setIsWaitingForSound] = useState(false); // New state to track sound detection

  // Access the unlock word and gesture from context
  const { unlockWord, setWordMatched, unlockGesture, setGestureMatched } = useUnlockContext();

  // Speech recognition hook
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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

    // Enter the sequence detection state and start waiting for sound
    setIsInSequenceDetectionState(true);
    setIsWaitingForSound(true);

    // Start listening for speech
    SpeechRecognition.startListening();

    // Stop listening after 5 seconds if unlock word is not detected
    timeoutIdRef.current = window.setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsWaitingForSound(false);
      setIsInSequenceDetectionState(false);
    }, 5000);
  };

  const waitForGesture = () => {
    // Reset gesture matching state
    setGestureMatched(false);

    // Start detecting gesture
    setIsDetectingGesture(true);
    setIsInSequenceDetectionState(true);

    // Stop waiting for gesture after 10 seconds if the unlock gesture is not matched
    timeoutIdRef.current = window.setTimeout(() => {
      setIsDetectingGesture(false);
      setIsInSequenceDetectionState(false);
    }, 10000);
  };

  // Handle the detected gesture
  const handleGestureDetected = (gesture: string) => {
    console.log(`Detected gesture: ${gesture}`);
    if (gesture === unlockGesture) {
      console.log("Unlock gesture detected!");
      setGestureMatched(true);

      // Stop gesture detection immediately upon match
      setIsDetectingGesture(false);
      setIsInSequenceDetectionState(false);

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    }
  };

  // Initialize gesture detection hook, but only activate detection when isDetectingGesture is true
  useGestureDetection(isDetectingGesture, handleGestureDetected);

  useEffect(() => {
    if (transcript && isWaitingForSound) {
      const wordToCheck = transcript.toLowerCase();
      console.log(`Detected sound: ${wordToCheck}`);
      if (wordToCheck === unlockWord) {
        console.log("Unlock word detected!");
        setWordMatched(true);

        // Stop listening to sound
        setIsWaitingForSound(false);
        SpeechRecognition.stopListening();

        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }

        // Start gesture detection after the word is matched
        waitForGesture();
      }
    }
  }, [transcript, isWaitingForSound, unlockWord, setWordMatched]);

  return (
    <div>
      <div className="title">
        <p className="line">Make</p>
        <p className="line">A</p>
        <p className="line">Wish</p>
      </div>
      <div className="editHome">
        {!isInSequenceDetectionState && (
          <>
            <IonButton onClick={waitForSound}>Unlock</IonButton>
            <Link to="/581-project2/edit" style={{ textDecoration: 'none' }}>
              <IonButton>Edit</IonButton>
            </Link>
          </>
        )}
      </div>

      <div className="body">
        <div className='spellStatusMessage'>
          {isWaitingForSound && 'Awaiting spell audio'}
          {isDetectingGesture && 'Awaiting wand movement'}
        </div>
      </div>
    </div>
  );
};

export default Home;
