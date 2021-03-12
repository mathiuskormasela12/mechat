// ===== ModalInput
// import all modules
import React, {Fragment} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export function ModalInput(props) {
  return (
    <Fragment>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor="#C5C5C5"
        keyboardType={props.type}
        style={styles.input}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
});
