// ===== App
// import all modules
import React, {Fragment, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import StackScreen from './src/StackScreen';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  });

  return (
    <Fragment>
      <StackScreen />
    </Fragment>
  );
}
