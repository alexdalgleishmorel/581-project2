import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import VoiceCapture from '../components/VoiceCapture';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <VoiceCapture />
      </IonContent>
    </IonPage>
  );
};

export default Home;
