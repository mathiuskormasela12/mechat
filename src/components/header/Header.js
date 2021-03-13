// ===== Header
// import all modules
import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// import all assets
import profile from '../../assets/img/profile.png';

export function Header() {
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowSearchBar = () =>
    setShowSearchBar((currentState) => !currentState);

  const goToProfile = () => navigation.navigate('Profile');

  return (
    <Fragment>
      <View style={styles.header}>
        <View style={styles.container}>
          {!showSearchBar ? (
            <Fragment>
              <View style={styles.firstColoumn}>
                <TouchableOpacity onPress={handleShowSearchBar}>
                  <Icon name="search-outline" color="#BEBEBE" size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.coloumn}>
                <Text style={styles.text}>MeChat</Text>
              </View>
              <View style={styles.secondColoumn}>
                <TouchableOpacity onPress={goToProfile}>
                  <Image source={profile} style={styles.img} />
                </TouchableOpacity>
              </View>
            </Fragment>
          ) : (
            <Fragment>
              <View style={styles.searchContainer}>
                <View style={styles.arrow}>
                  <TouchableOpacity onPress={handleShowSearchBar}>
                    <Icon name="arrow-back-outline" color="#BEBEBE" size={25} />
                  </TouchableOpacity>
                </View>
                <View style={styles.search}>
                  <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#BEBEBE"
                    keyboardType="web-search"
                    style={styles.input}
                  />
                </View>
              </View>
            </Fragment>
          )}
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
  },
  container: {
    width: '88%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    height: '100%',
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
  firstColoumn: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  secondColoumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  coloumn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  arrow: {
    height: '100%',
    justifyContent: 'center',
    width: '10%',
  },
  search: {
    height: '100%',
    width: '89%',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
  },
});
