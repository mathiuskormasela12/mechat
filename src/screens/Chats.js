// ===== Chats
// import all modules
import React, {Component, Fragment} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import http from '../services/Services';
import {setChatList} from '../redux/actions/chat';
import {connect} from 'react-redux';

// import all components
import {ChatList} from '../components';

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

  fetchData = async () => {
    try {
      const {data} = await http.getChatHistory(this.props.auth.token, {
        page: 1,
        keyword: this.props.search.keyword,
        sort: this.props.search.isASC ? 'ASC' : 'DESC',
      });
      this.props.setChatList(data.results);
      console.log(data.results);
    } catch (err) {
      this.props.setChatList([]);
      console.log(err);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.search.keyword !== this.props.search.keyword ||
      prevProps.search.isASC !== this.props.search.isASC
    ) {
      this.fetchData();
    }
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <FlatList
            data={this.props.chat.chatList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <ChatList
                name={item.contact_name}
                message={item.message}
                picture={item.picture}
                time={item.createdAt}
                id={item.friend_id}
              />
            )}
          />
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = (states) => ({
  auth: states.auth,
  chat: states.chat,
  search: states.search,
});

const mapDispatchToProps = {
  setChatList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  hero: {
    flex: 1,
    backgroundColor: 'white',
  },
});
