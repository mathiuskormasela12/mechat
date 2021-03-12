// ===== Chats
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';

// import all components
import {} from '../components';

class Chats extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <ScrollView>
          <View style={styles.hero}>
            {/* {[...Array(100)].map((item, index) => (
              <Fragment key={index.toString()}>
                <Text style={styles.text}>Chats</Text>
              </Fragment>
            ))} */}
            <Text style={styles.text}>Chats</Text>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

export default Chats;

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  hero: {
    backgroundColor: 'red',
    minHeight: (74 / 100) * Dimensions.get('screen').height,
  },
});
