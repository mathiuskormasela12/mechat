// ===== TextField
// import all modules
import React, {Fragment} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export function TextField(props) {
  return (
    <Fragment>
      <TextInput
        style={styles.input(props)}
        placeholder={props.placeholder}
        placeholderTextColor="#C5C5C5"
        keyboardType={props.type}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  input: function (props) {
    return {
      borderRadius: 12,
      width: '100%',
      height: props.height ? props.height : 50,
      backgroundColor: '#F3F3F3',
      paddingHorizontal: 22,
      fontSize: 16,
    };
  },
});
