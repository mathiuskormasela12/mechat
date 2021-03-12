// ===== Chats
// import all modules
import React, {Component, Fragment} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

// import all components
import {ChatList} from '../components';

import profile from '../assets/img/profile.png';

class Chats extends Component {
  constructor() {
    super();
    this.state = {
      messages: [
        {
          name: 'Nayeon',
          message: 'Hai, Mathius lgi ngapain ?',
        },
        {
          name: 'Mina',
          message: 'Hai, Mathius lgi ngapain ?',
        },
        {
          name: 'Sana',
          message: 'Hai, Mathius lgi ngapain ?',
        },
        {
          name: 'Tzuyu',
          message: 'Hai, Mathius lgi ngapain ?',
        },
        {
          name: 'Momo',
          message: 'Hai, Mathius lgi ngapain ?',
        },
        {
          name: 'Jihyo',
          message: 'Hai, Mathius lgi ngapain ?',
        },
        {
          name: 'Dahyun',
          message: 'Kamu klo nyebut nama...',
        },
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <FlatList
            data={this.state.messages}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <ChatList
                picture={profile}
                name={item.name}
                message={item.message}
              />
            )}
          />
        </View>
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
    flex: 1,
    backgroundColor: 'white',
  },
});
