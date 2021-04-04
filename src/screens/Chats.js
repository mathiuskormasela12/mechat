// ===== Chats
// import all modules
import React, {Component, Fragment} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {setHistory} from '../redux/actions/history';
import {connect} from 'react-redux';

// import all components
import {ChatList} from '../components';

class Chats extends Component {
  fetchData = () => {
    this.props.setHistory(
      this.props.auth.token,
      this.props.search.keyword,
      this.props.search.isASC,
    );
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
            data={this.props.history.histories}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <ChatList
                name={item.contact_name}
                message={item.message}
                picture={item.picture}
                time={item.time}
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
  history: states.history,
  search: states.search,
});

const mapDispatchToProps = {
  setHistory,
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
