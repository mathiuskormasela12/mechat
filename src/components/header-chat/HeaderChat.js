// ===== Header
// import all modules
import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import http from '../../services/Services';

// import all actions
import {sort, search} from '../../redux/actions/search';

// import all assets
// import profile from '../../assets/img/profile.png';

export function HeaderChat(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {isASC: isAsc} = useSelector((current) => current.search);
  const token = useSelector((current) => current.auth.token);
  const [profile, setProfile] = useState({});

  const handleShowSearchBar = () =>
    setShowSearchBar((currentState) => !currentState);

  const back = () => navigation.navigate('Home');
  const handleAsc = () => dispatch(sort());
  const handleSearch = (value) => dispatch(search(value));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await http.getContactById(token, route.params.contactId);
        setProfile(data.results);
      } catch (err) {
        console.log(err);
        setProfile({});
      }
    };

    fetchData();
  }, [route.params.contactId, token]);

  return (
    <Fragment>
      <View style={styles.header}>
        <View style={styles.container}>
          {!showSearchBar ? (
            <Fragment>
              <View style={styles.firstColoumn}>
                <TouchableOpacity onPress={back}>
                  <Icon name="arrow-back-outline" color="#BEBEBE" size={25} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: profile.picture,
                    }}
                    style={styles.img}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.coloumn}>
                <Text style={styles.text}>{profile.contact_name}</Text>
              </View>
              <View style={styles.secondColoumn}>
                <TouchableOpacity onPress={handleShowSearchBar}>
                  <Icon name="search" color="#BEBEBE" size={25} />
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
                    onChangeText={handleSearch}
                  />
                </View>
                <View style={styles.arrowAsc}>
                  <TouchableOpacity onPress={handleAsc}>
                    {isAsc ? (
                      <Icon
                        name="arrow-down-outline"
                        color="#BEBEBE"
                        size={25}
                      />
                    ) : (
                      <Icon name="arrow-up-outline" color="#BEBEBE" size={25} />
                    )}
                  </TouchableOpacity>
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
    elevation: 2,
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
    resizeMode: 'cover',
    height: 40,
    width: 40,
    borderRadius: 40,
    marginLeft: 10,
  },
  firstColoumn: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  secondColoumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  coloumn: {
    flex: 3,
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
    width: '79%',
    justifyContent: 'center',
  },
  arrowAsc: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '10%',
  },
  input: {
    fontSize: 16,
  },
});
