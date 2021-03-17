// ===== ChatList
// import all modules
import React, {Fragment} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function ChatList(props) {
  const navigation = useNavigation();

  const goToChatList = (id) => navigation.navigate('Chat Room', {id});

  return (
    <Fragment>
      <TouchableOpacity onPress={() => goToChatList(props.id)}>
        <View style={styles.card}>
          <View style={[styles.col, styles.little]}>
            <Image
              source={{
                uri: props.picture,
              }}
              style={styles.img}
            />
          </View>
          <View style={[styles.col, styles.big]}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.message}>{props.message}</Text>
          </View>
          <View style={[styles.col, styles.aside]}>
            <Text style={styles.time}>{props.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  card: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    borderStyle: 'solid',
  },
  col: {
    height: '100%',
  },
  little: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  big: {
    width: '60%',
    justifyContent: 'center',
  },
  aside: {
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Geometria',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    fontFamily: 'Geometria',
    fontWeight: 'normal',
    fontSize: 15,
  },
  time: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: 'normal',
    fontSize: 15,
  },
});
