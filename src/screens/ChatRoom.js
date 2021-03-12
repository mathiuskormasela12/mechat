// ===== Chat Room
// import all modules
import React, {Component, Fragment} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

// import all components
import {TextField, Container, ChatBuble} from '../components';

// import assets
import Icon from 'react-native-vector-icons/Ionicons';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        {
          userId: 1,
          message: 'Hello Mathius',
          mine: false,
          time: '20:30',
        },
        {
          userId: 2,
          message: 'Knp',
          mine: true,
          time: '09:00',
        },
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <Container style={styles.containerPadding}>
            <FlatList
              data={this.state.chats}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item}) => (
                <ChatBuble
                  mine={item.mine}
                  message={item.message}
                  time={item.time}
                />
              )}
            />
          </Container>
          <View style={styles.chatFooter}>
            <Container style={styles.container}>
              <View style={styles.row}>
                <View style={styles.inputCol}>
                  <TextField
                    keyboardType="default"
                    placeholder="Type Your Message ...."
                    height={45}
                  />
                </View>
                <View style={styles.btnCol}>
                  <TouchableOpacity style={styles.contact}>
                    <Icon name="send-outline" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </Container>
          </View>
        </View>
      </Fragment>
    );
  }
}

export default ChatRoom;

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'white',
    flex: 1,
  },
  chatFooter: {
    height: 80,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
  },
  contact: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5F2EEA',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputCol: {
    width: '85%',
  },
  btnCol: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  containerPadding: {
    flex: 1,
    paddingVertical: 32,
    width: '90%',
  },
});
