// ===== TextField
// import all modules
import React, {Fragment} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export function TextField(props) {
  return (
    <Fragment>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="#C5C5C5"
        keyboardType={props.type}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    width: '100%',
    height: 50,
    backgroundColor: '#F3F3F3',
    paddingLeft: 22,
    fontSize: 16,
  },
});
