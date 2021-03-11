// ===== TextField
// import all modules
import React, {Fragment} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

export function PhoneField(props) {
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.flag}>
            <View style={styles.red} />
            <View style={styles.white} />
          </View>
          <Text>+62</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type Your Number...."
          placeholderTextColor="#C5C5C5"
          keyboardType="phone-pad"
        />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: '100%',
    height: 50,
    backgroundColor: '#F3F3F3',
    fontSize: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  input: {
    borderWidth: 0,
    width: '75%',
    height: '100%',
    backgroundColor: 'transparent',
    paddingLeft: 7,
  },
  item: {
    height: '100%',
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  flag: {
    width: '30%',
    height: '25%',
    borderWidth: 0,
    marginRight: 10,
  },
  white: {
    backgroundColor: 'white',
    height: '50%',
    width: '100%',
    borderWidth: 0,
  },
  red: {
    backgroundColor: 'red',
    height: '50%',
    width: '100%',
    borderWidth: 0,
  },
});
