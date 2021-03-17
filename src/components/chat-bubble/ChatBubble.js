// ===== ChatBuble
// import all modules
import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function ChatBuble(props) {
  return (
    <Fragment>
      {props.mine ? (
        <View style={[styles.container, styles.me]}>
          <View style={[styles.buble, styles.primary]}>
            <Text style={[styles.text, styles.white]}>{props.message}</Text>
            <Text style={[styles.time, styles.white]}>{props.time}</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.container, styles.friend]}>
          <View style={[styles.buble, styles.normal]}>
            <Text style={[styles.text, styles.black]}>{props.message}</Text>
            <Text style={[styles.time, styles.black]}>{props.time}</Text>
          </View>
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  buble: {
    padding: 10,
    minWidth: 70,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  primary: {
    backgroundColor: '#5F2EEA',
  },
  normal: {
    backgroundColor: '#F2F2F2',
  },
  friend: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  me: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    width: 'auto',
    height: 'auto',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  white: {
    color: 'white',
  },
  black: {
    color: 'black',
  },
  text: {
    fontFamily: 'ProximaNova',
  },
  time: {
    fontFamily: 'ProximaNova',
    fontSize: 10,
    marginLeft: 10,
  },
});
