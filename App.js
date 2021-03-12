// ===== App
// import all modules
import React, {Fragment, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import persistedStore from './src/redux/store';
import StackScreen from './src/StackScreen';

export default function App() {
  const {persistor, store} = persistedStore();

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  });

  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StackScreen />
        </PersistGate>
      </Provider>
    </Fragment>
  );
}
