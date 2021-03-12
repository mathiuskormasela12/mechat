// ===== Alert
// import all modules
import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Alert(props) {
  return (
    <Fragment>
      <View style={styles.alert}>
        <Text style={[styles.text(props), styles[props.type]]}>
          {props.children}
        </Text>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  alert: {
    fontSize: 16,
    width: '100%',
  },
  text: function (props) {
    return {
      fontFamily: 'Goemetria',
      fontSize: !props.md ? 15 : 13,
    };
  },
  danger: {
    color: '#dc3545',
  },
  warning: {
    color: '#ffc107',
  },
});
