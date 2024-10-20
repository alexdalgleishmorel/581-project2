import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  return (
    <div>
      <div className="title">
        <p className="line">Make</p>
        <p className="line">A</p>
        <p className="line">Wish</p>
      </div>
      <div className='editHome'>
        <Link to="/edit" style={{ textDecoration: 'none' }}>
          <IonButton>Edit</IonButton>
        </Link>

      </div>

      
      <div className='body'>
        {/* Functionality to detect the sensors */}
      </div>


    </div>
  );
};

export default Home;
