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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import http from '../../services/Services';
import io from '../../helpers/socket';

// import all actions
import {sort, search} from '../../redux/actions/search';

export function Header() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((current) => current.auth.token);
  const user = useSelector((current) => current.user);
  const {isASC: isAsc, keyword} = useSelector((current) => current.search);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowSearchBar = () =>
    setShowSearchBar((currentState) => !currentState);

  const handleAsc = () => dispatch(sort());
  const handleSearch = (value) => dispatch(search(value));

  useEffect(() => {
    if (token) {
      const decode = jwtdecode(token);
      const fetchData = async () => {
        try {
          const {data} = await http.getUserById(token, decode.id);
          dispatch({
            type: 'SET_USER_PROFILE',
            payload: {
              fullName: data.results.full_name,
              picture: data.results.picture,
              phoneNumber: data.results.phone_number,
              about: data.results.about,
              email: data.results.email,
              status: data.results.status,
            },
          });
        } catch (err) {
          console.log(err.response.data.message);
        }
      };
      fetchData();
      io.onAny(() => {
        io.once(`Update_Profile_${decode.id}`, (msg) => {
          console.log(msg);
          fetchData();
        });
      });
    }
  }, [token, dispatch]);

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
                  <Image
                    source={{
                      uri: user.picture,
                    }}
                    style={styles.img}
                  />
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
                    value={keyword}
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
