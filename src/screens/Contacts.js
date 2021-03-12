// ===== Contacts
// import all modules
import React, {Component, Fragment} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

// import all components
import {ContactList} from '../components';

import profile from '../assets/img/profile.png';

class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          name: 'Nayeon',
          status: 'Available',
        },
        {
          name: 'Mina',
          status: 'Avaliable',
        },
        {
          name: 'Sana',
          status: 'Busy',
        },
        {
          name: 'Tzuyu',
          status: 'Listening Music',
        },
        {
          name: 'Momo',
          status: 'Busy',
        },
        {
          name: 'Jihyo',
          status: 'Busy',
        },
        {
          name: 'Dahyun',
          status: 'Busy',
        },
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <FlatList
            data={this.state.contacts}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <ContactList
                picture={profile}
                name={item.name}
                status={item.status}
              />
            )}
          />
        </View>
      </Fragment>
    );
  }
}

export default Contacts;

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  hero: {
    flex: 1,
    backgroundColor: 'white',
  },
});
