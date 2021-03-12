// ===== Wrapper
// import all modules
import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';

export function Wrapper() {
  return (
    <Fragment>
      <View style={styles.wrapper} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
