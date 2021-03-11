// ===== Chats
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// import all components
import {} from '../components';

class Chats extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <Text style={styles.text}>Chats</Text>
      </Fragment>
    );
  }
}

export default Chats;

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
});
