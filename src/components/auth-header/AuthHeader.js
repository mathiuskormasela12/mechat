// ===== AuthHeader
// import all modules
import React, {Fragment} from 'react';
import {Text, View, StyleSheet} from 'react-native';

// import all assets
import Logo from '../../assets/img/logo.svg';

export function AuthHeader() {
  return (
    <Fragment>
      <View style={styles.header}>
        <Logo height={75} width={75} />
        <Text style={styles.title}>Welcome to MeChat</Text>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontFamily: 'Geometria-Medium',
    fontSize: 24,
    marginTop: 35,
    fontWeight: '500',
  },
});
