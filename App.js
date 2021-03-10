import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Text, StyleSheet} from 'react-native';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  });

  return <Text style={styles.text}>Hello</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Geometria-Bold',
  },
});
