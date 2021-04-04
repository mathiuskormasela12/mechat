// ===== Header
// import all modules
import React, {Fragment, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import http from '../../services/Services';

export function HeaderChat(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector((current) => current.auth.token);
  const [profile, setProfile] = useState({});

  const back = () => {
    navigation.navigate('Home');
    dispatch({
      type: 'SET_CHAT',
      payload: {
        chats: [],
      },
    });
  };

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
          </Fragment>
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  coloumn: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    height: '100%',
    justifyContent: 'center',
    width: '10%',
  },
});
