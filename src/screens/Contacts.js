// ===== Contacts
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// import all components
import {} from '../components';

class Contacts extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <Text style={styles.text}>Contacts</Text>
      </Fragment>
    );
  }
}

export default Contacts;

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
});
