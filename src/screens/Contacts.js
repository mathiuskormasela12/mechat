// ===== Contacts
// import all modules
import React, {Component, Fragment} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

// import all components
import {ContactList} from '../components';

// import assets
import Icon from 'react-native-vector-icons/Ionicons';

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
          <TouchableOpacity style={styles.contact}>
            <Icon name="person-add-outline" size={20} color="white" />
          </TouchableOpacity>
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
  contact: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5F2EEA',
  },
});
