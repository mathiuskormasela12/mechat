// ===== MiniLoading
// import all modules
import React, {Fragment} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export function MiniLoading() {
  return (
    <Fragment>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#5F2EEA" />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
