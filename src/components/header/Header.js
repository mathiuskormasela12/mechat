// ===== Header
// import all modules
import React, {Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// import all assets
import profile from '../../assets/img/profile.png';

export function Header() {
  return (
    <Fragment>
      <View style={styles.header}>
        <View style={styles.edgeColoumn}>
          <TouchableOpacity>
            <Icon name="search-outline" color="#BEBEBE" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.coloumn}>
          <Text style={styles.text}>MeChat</Text>
        </View>
        <View style={styles.edgeColoumn}>
          <TouchableOpacity>
            <Image source={profile} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontFamily: 'ProximaNova-Regular',
    color: '#14142B',
  },
  img: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
  },
  edgeColoumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coloumn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
