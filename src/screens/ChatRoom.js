// ===== Chat Room
// import all modules
import React, {Component, Fragment} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import http from '../services/Services';
import io from '../helpers/socket';
import formData from '../helpers/formData';
import {setChat} from '../redux/actions/chat';

// import all components
import {TextField, Container, ChatBuble} from '../components';

// import assets
import Icon from 'react-native-vector-icons/Ionicons';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      chat: null,
      listRefresh: false,
      page: 1,
    };
  }

  getChatList = async () => {
    const {id} = this.props.route.params;
    console.log('========== ID =======');
    console.log(id);
    try {
      const {data} = await http.getChatList(this.props.auth.token, id, {
        keyword: this.props.search.keyword,
        sort: this.props.search.isASC ? 'ASC' : 'DESC',
        page: 1,
      });

      if (data.pageInfo.currentPage < data.pageInfo.totalPage) {
        this.setState((c) => ({
          ...c,
          page: Number(c.page) + 1,
        }));
      }

      this.props.setChat(data.results);
      console.log('========== IDS =======');
      console.log(this.props.chat.chats);
      // this.setState({
      //   chats: data.results,
      // });
    } catch (err) {
      this.props.setChat([]);
      console.log(err.message);
    }
  };

  fetchNewData = async () => {
    this.setState({
      listRefresh: true,
    });

    const {id} = this.props.route.params;
    try {
      const {data} = await http.getChatList(this.props.auth.token, id, {
        keyword: this.props.search.keyword,
        sort: this.props.search.isASC ? 'ASC' : 'DESC',
        page: this.state.page,
      });

      const {chats} = this.props.chat;
      const newData = [...chats, ...data.results];
      this.props.setChat(newData);
      if (data.pageInfo.currentPage < data.pageInfo.totalPage) {
        this.setState((c) => ({
          ...c,
          page: Number(c.page) + 1,
        }));
      }
      this.setState({
        listRefresh: false,
      });
    } catch (err) {
      this.setState({
        listRefresh: false,
      });
      console.log(err.message);
    }
  };

  getNextChatList = async () => {
    const {id} = this.props.route.params;
    try {
      const {data} = await http.getChatList(this.props.auth.token, id, {
        keyword: this.props.search.keyword,
        sort: this.props.search.isASC ? 'ASC' : 'DESC',
        page: this.state.page,
      });
      this.setState({
        link: data.pageInfo.nextLink,
      });
      // this.setState({
      //   chats: data.results,
      // });

      if (data.pageInfo.currentPage <= data.pageInfo.totalPage) {
        const {chats} = this.props.chat;
        const newData = [...chats, ...data.results];
        this.props.setChat(newData);
        this.setState((c) => ({
          ...c,
          page: Number(c.page) + 1,
        }));
      }
      this.setState({
        listRefresh: false,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleInput = (value) => {
    this.setState({
      chat: value,
    });
  };

  handleSubmit = async () => {
    const {id} = this.props.route.params;

    const forms = formData('URLSearchParams', {
      friendId: id,
      message: this.state.chat,
    });
    try {
      await http.createChat(this.props.auth.token, forms);
      this.setState({
        chat: null,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  componentDidMount() {
    this.getChatList();
    io.onAny(() => {
      io.once('Send_Message', (msg) => {
        console.log(msg);
        this.getChatList();
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.search.keyword !== this.props.search.keyword ||
      prevProps.search.isASC !== this.props.search.isASC
    ) {
      this.getChatList();
    }
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <Container style={styles.containerPadding}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.chat.chats}
              inverted
              renderItem={({item}) => (
                <ChatBuble
                  mine={item.mine}
                  message={item.message}
                  time={item.time}
                />
              )}
              keyExtractor={(item, index) => String(index)}
              onEndReached={this.getNextChatList}
              onEndReachedThreshold={0.5}
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
                    onChangeText={this.handleInput}
                    value={this.state.chat}
                  />
                </View>
                <View style={styles.btnCol}>
                  <TouchableOpacity
                    style={styles.contact}
                    onPress={this.handleSubmit}>
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

const mapStateToProps = (states) => {
  return {
    auth: states.auth,
    search: states.search,
    chat: states.chat,
  };
};

const mapDispatchToProps = {
  setChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

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
    paddingTop: 32,
    width: '90%',
  },
});
