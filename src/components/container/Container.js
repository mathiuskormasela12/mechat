// ===== Container
// import all modules
import React, {Fragment} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

export function Container(props) {
  return (
    <Fragment>
      <View style={styles.container(props.style)}>{props.children}</View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: function (style) {
    return {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: (80 / 100) * Dimensions.get('screen').width,
      ...style,
    };
  },
});
