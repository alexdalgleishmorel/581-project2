import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { HashRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Home from './pages/Home';
import Edit from './pages/Edit';
import EditSound from './pages/editSound';
import EditGesture from './pages/editGesture';
import { UnlockProvider } from './UnlockContext';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <UnlockProvider>
    <IonApp>
      <IonReactRouter basename="/581-project2/#">
        <HashRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/edit">
              <Edit />
            </Route>
            <Route exact path="/editGesture">
              <EditGesture />
            </Route>
            <Route exact path="/editSound">
              <EditSound />
            </Route>
          </IonRouterOutlet>
        </HashRouter>
      </IonReactRouter>
    </IonApp>
  </UnlockProvider>
);

export default App;
