// ===== Button
// import all modules
import React, {Fragment} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

export function Button(props) {
  return (
    <Fragment>
      <TouchableOpacity {...props}>
        <View style={styles.container}>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: '#5F2EEA',
    borderRadius: 22,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Geometria-Medium',
    fontSize: 17,
  },
});
