// ===== ChatList
// import all modules
import React, {Fragment} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

export function ContactList(props) {
  return (
    <Fragment>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={[styles.col, styles.little]}>
            <Image source={props.picture} style={styles.img} />
          </View>
          <View style={[styles.col, styles.big]}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.status}>{props.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
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
    width: '78%',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Geometria',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontFamily: 'Geometria',
    fontWeight: 'normal',
    fontSize: 15,
  },
});
