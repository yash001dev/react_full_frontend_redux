import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {store,persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

ReactDOM.render((
  <Provider store={store}>
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
