// ===== StackScreen
// import all modules
import React, {Fragment, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import RNBootSplash from 'react-native-bootsplash';

// import all screens
import Auth from './screens/Auth';
import EmailCode from './screens/EmailCode';
import FullName from './screens/FullName';
import Home from './screens/Home';
import ChatRoom from './screens/ChatRoom';
import Profile from './screens/Profile';

// import all component
import {Header, Wrapper, HeaderChat} from './components';

const Stack = createStackNavigator();

export default function StackScreen() {
  const showWrapper = useSelector(
    (currentState) => currentState.loading.showWrapper,
  );
  const token = useSelector((currentState) => currentState.auth.token);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  });

  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{header: () => (token ? <Header /> : <Auth />)}}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Email Code"
            component={EmailCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Full Name"
            component={FullName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chat Room"
            component={ChatRoom}
            options={{header: () => <HeaderChat />}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {showWrapper && <Wrapper />}
      <FlashMessage position="top" />
    </Fragment>
  );
}
