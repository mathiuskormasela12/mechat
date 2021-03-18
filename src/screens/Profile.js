// ===== Profile
// import all modules
import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import http from '../services/Services';
import jwtdecode from 'jwt-decode';
import formData from '../helpers/formData';

// import all component
import {Container, ModalInput, ModalButton, Alert} from '../components';

export default function Profile(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((currentState) => currentState.user);
  const token = useSelector((currentState) => currentState.auth.token);
  const [isVisible, setVisible] = useState(false);
  const [state, setState] = useState({
    label: null,
    placeholder: null,
    name: null,
    type: null,
    value: null,
    message: null,
    alertType: null,
  });
  const decode = token ? jwtdecode(token) : null;

  const back = () => navigation.navigate('Home');

  const handleCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      async (response) => {
        if (response.uri) {
          if (response.fileSize > 3000000) {
            showMessage({
              message: 'Photo size must be lower than 3mb',
              type: 'warning',
              duration: 2000,
              hideOnPress: true,
            });
          } else {
            try {
              const form = formData('FormData', {
                picture: {
                  uri: response.uri,
                  type: response.type,
                  name: response.fileName,
                },
              });
              await http.upload(token, decode.id, form);
            } catch (err) {
              console.log(err);
              showMessage({
                message: err.response.data.message,
                type: 'warning',
                duration: 2000,
                hideOnPress: true,
              });
            }
          }
        }
      },
    );
  };

  const handleImgLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      async (response) => {
        if (response.uri) {
          if (response.fileSize > 3000000) {
            showMessage({
              message: 'Photo size must be lower than 3mb',
              type: 'warning',
              duration: 2000,
              hideOnPress: true,
            });
          } else {
            try {
              const form = formData('FormData', {
                picture: {
                  uri: response.uri,
                  type: response.type,
                  name: response.fileName,
                },
              });
              await http.upload(token, decode.id, form);
            } catch (err) {
              console.log(err);
              showMessage({
                message: err.response.data.message,
                type: 'warning',
                duration: 2000,
                hideOnPress: true,
              });
            }
          }
        }
      },
    );
  };

  const handleShowWrapper = (placeholder, name, label, type) => {
    dispatch({
      type: 'SET_WRAPPER',
    });
    setVisible((visible) => !visible);
    setState((currentState) => {
      if (user[name] === '' || !user[name]) {
        return {
          ...currentState,
          placeholder,
          name,
          label,
          type,
          message: `${name} can't be empty`,
          alertType: 'warning',
          value: user[name],
        };
      } else {
        return {
          ...currentState,
          placeholder,
          name,
          label,
          type,
          message: null,
          alertType: null,
          value: user[name],
        };
      }
    });

    // if (state.value === '') {
    //   setState((c) => ({
    //     ...c,
    //     message: `${name} can't be empty`,
    //     alertType: 'warning',
    //   }));
    // }
    // setState((currentState) => ({
    //   ...currentState,
    //   placeholder,
    //   name,
    //   label,
    //   type,
    //   message: null,
    //   alertType: null,
    //   value: user[name],
    // }));

    // if (state.value === '') {
    //   setState((c) => ({
    //     ...c,
    //     message: `${name} can't be empty`,
    //     alertType: 'warning',
    //   }));
    // }
  };

  const handleInput = (value) => {
    const email = value.match(/[^@$a-z0-9.]/gi);
    if (state.name === 'phoneNumber') {
      if (!value) {
        setState((current) => ({
          ...current,
          message: "Phone number can't be empty",
          alertType: 'warning',
        }));
      } else if (value.match(/[^0-9]/gi) !== null || value.length < 11) {
        setState((current) => ({
          ...current,
          message: 'Invalid Phone Number',
          alertType: 'warning',
        }));
      } else {
        setState((c) => ({
          ...c,
          message: null,
          alertType: null,
        }));
      }
    } else if (state.name === 'email') {
      if (!value) {
        setState((current) => ({
          ...current,
          message: "Email can't be empty",
          alertType: 'warning',
        }));
      } else if (
        email ||
        !value.match(/@\b/g) ||
        value.match(/\s/) ||
        value.match(/\b[0-9]/) ||
        !value.split('@').pop().includes('.')
      ) {
        setState((c) => ({
          ...c,
          message: 'Invalid Email',
          alertType: 'warning',
        }));
      } else {
        setState((c) => ({
          ...c,
          message: null,
          alertType: null,
        }));
      }
    } else if (state.name === 'fullName') {
      if (!value) {
        setState((current) => ({
          ...current,
          message: "Fullname can't be empty",
          alertType: 'warning',
        }));
      } else {
        setState((c) => ({
          ...c,
          message: null,
          alertType: null,
        }));
      }
    } else if (state.name === 'about') {
      if (!value) {
        setState((current) => ({
          ...current,
          message: "about can't be empty",
          alertType: 'warning',
        }));
      } else {
        setState((c) => ({
          ...c,
          message: null,
          alertType: null,
        }));
      }
    } else if (state.name === 'status') {
      if (!value) {
        setState((current) => ({
          ...current,
          message: "status can't be empty",
          alertType: 'warning',
        }));
      } else {
        setState((c) => ({
          ...c,
          message: null,
          alertType: null,
        }));
      }
    }
    setState((currentState) => ({
      ...currentState,
      value,
    }));
  };

  const handleSubmit = async () => {
    const form = formData('URLSearchParams', {
      [state.name]: escape(state.value),
    });
    if (state.name === 'about') {
      try {
        await http.editAbout(token, decode.id, form);
        handleShowWrapper(null, null, null, null);
      } catch (err) {
        console.log(err);
        handleShowWrapper(null, null, null, null);
      }
    } else if (state.name === 'fullName') {
      try {
        await http.editFullName(decode.id, form);
        handleShowWrapper(null, null, null, null);
      } catch (err) {
        console.log(err);
        handleShowWrapper(null, null, null, null);
      }
    } else if (state.name === 'email') {
      try {
        await http.editEmail(token, decode.id, form);
        handleShowWrapper(null, null, null, null);
      } catch (err) {
        console.log(err);
        handleShowWrapper(null, null, null, null);
      }
    } else if (state.name === 'phoneNumber') {
      try {
        await http.editPhone(token, decode.id, form);
        handleShowWrapper(null, null, null, null);
      } catch (err) {
        console.log(err);
        handleShowWrapper(null, null, null, null);
      }
    } else if (state.name === 'status') {
      try {
        await http.editStatus(token, decode.id, form);
        handleShowWrapper(null, null, null, null);
      } catch (err) {
        console.log(err);
        handleShowWrapper(null, null, null, null);
      }
    }
  };

  const deleteAccount = async () => {
    try {
      await http.deleteAccount(token, decode.id);
      dispatch({
        type: 'LOGOUT',
      });
      dispatch({
        type: 'REMOVE_CHat',
      });
      navigation.navigate('Auth');
    } catch (err) {
      console.log(err);
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 2000,
        hideOnPress: true,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    dispatch({
      type: 'REMOVE_CONTACT',
    });
    navigation.navigate('Auth');
  };

  return (
    <Fragment>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.form}>
              <Container style={styles.containerModal}>
                <View style={styles.control}>
                  <Text style={styles.label}>{state.label}</Text>
                  <View style={styles.field}>
                    <ModalInput
                      placeholder={state.placeholder}
                      type={state.type}
                      onChangeText={handleInput}
                      value={state.value}
                    />
                    {(state.value === '' || !state.value || state.message) && (
                      <View style={styles.alert}>
                        <Alert type={state.alertType} md>
                          {state.message}
                        </Alert>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.controlBtn}>
                  <View style={styles.btnCol}>
                    {state.message ? (
                      <ModalButton onPress={handleSubmit} disabled={true}>
                        Save
                      </ModalButton>
                    ) : (
                      <ModalButton onPress={handleSubmit}>Save</ModalButton>
                    )}
                  </View>
                  <View style={styles.btnCol}>
                    <ModalButton
                      onPress={() => handleShowWrapper(null, null, null, null)}>
                      Cancle
                    </ModalButton>
                  </View>
                </View>
              </Container>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.hero}>
          <View style={styles.header}>
            <View style={styles.nav}>
              <Container style={styles.container}>
                <TouchableWithoutFeedback onPress={back}>
                  <View style={styles.box}>
                    <View style={[styles.col, styles.removeMargin]}>
                      <Icon
                        name="chevron-back-outline"
                        color="black"
                        size={25}
                      />
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.back}>Back</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Container>
            </View>
            <Image
              source={{
                uri: user.picture,
              }}
              style={styles.img}
            />
          </View>
          <View style={styles.contain}>
            <Container style={styles.mainContainer}>
              <View style={styles.boxContain}>
                <Container style={styles.boxContainer}>
                  <View style={styles.boxCol}>
                    <Text style={styles.name}>{user.fullName}</Text>
                    <Text style={styles.tel}>{user.phoneNumber}</Text>
                  </View>
                  <View style={[styles.boxCol, styles.boxColFlex]}>
                    <TouchableOpacity style={styles.buble}>
                      <Icon name="chatbubble" color="white" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buble}
                      onPress={handleCamera}>
                      <Icon name="camera" color="white" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buble, styles.removeMargin]}
                      onPress={handleImgLibrary}>
                      <Icon name="image" color="white" size={18} />
                    </TouchableOpacity>
                  </View>
                </Container>
              </View>
              <View style={[styles.mainContainer, styles.mt]}>
                <View style={styles.boxContain}>
                  <Container style={[styles.boxContainer, styles.statusBox]}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <Text style={styles.aboutText}>
                      {user.about &&
                      user.about !== 'null' &&
                      user.about !== '' &&
                      user.about !== 'undefined'
                        ? user.about
                        : '-'}
                    </Text>
                  </Container>
                </View>
              </View>
              <View style={[styles.mainContainer, styles.mt]}>
                <View style={styles.boxContain}>
                  <Container style={[styles.boxContainer, styles.statusBox]}>
                    <TouchableOpacity
                      style={styles.list}
                      onPress={() =>
                        handleShowWrapper(
                          'Type Your About...',
                          'about',
                          'About',
                          'default',
                        )
                      }>
                      <View style={[styles.buble]}>
                        <Icon name="pencil" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Edit Your About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.list}
                      onPress={() =>
                        handleShowWrapper(
                          'Type Your Full Name...',
                          'fullName',
                          'Full Name',
                          'default',
                        )
                      }>
                      <View style={[styles.buble]}>
                        <Icon name="person" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Edit Your Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.list}
                      onPress={() =>
                        handleShowWrapper(
                          'Type Your Phone Number...',
                          'phoneNumber',
                          'Phone Number',
                          'number-pad',
                        )
                      }>
                      <View style={[styles.buble]}>
                        <Icon name="call" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>
                        Edit Your Phone Number
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.list}
                      onPress={() =>
                        handleShowWrapper(
                          'Type Your Email...',
                          'email',
                          'Email',
                          'email-address',
                        )
                      }>
                      <View style={[styles.buble]}>
                        <Icon name="mail" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Edit Your Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.list}
                      onPress={() =>
                        handleShowWrapper(
                          'Type Your Status...',
                          'status',
                          'Status',
                          'default',
                        )
                      }>
                      <View style={[styles.buble]}>
                        <Icon name="star" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Edit Your Status</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.list}
                      onPress={deleteAccount}>
                      <View style={[styles.buble]}>
                        <Icon name="trash" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.list, styles.removeMargin]}
                      onPress={logout}>
                      <View style={[styles.buble]}>
                        <Icon name="log-out" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Logout</Text>
                    </TouchableOpacity>
                  </Container>
                </View>
              </View>
            </Container>
          </View>
        </View>
        <View style={styles.footer}>
          <Container>
            <Text style={styles.textFooter}>© 2021 MeChat By Mathius</Text>
          </Container>
        </View>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'white',
    flex: 1,
  },
  nav: {
    alignItems: 'flex-start',
    paddingVertical: 20,
    backgroundColor: 'transparent',
    zIndex: 5,
  },
  container: {
    width: '92%',
    flexWrap: 'wrap',
  },
  header: {
    position: 'relative',
    backgroundColor: 'transparent',
    height: 300,
  },
  img: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 5,
  },
  back: {
    fontFamily: 'Geometria-Regular',
  },
  col: {
    marginLeft: 8,
  },
  removeMargin: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  contain: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxContain: {
    position: 'relative',
    top: -20,
    backgroundColor: '#FCFCFC',
    paddingVertical: 20,
    borderRadius: 5,
  },
  mainContainer: {
    width: '95%',
  },
  boxContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxCol: {},
  name: {
    fontFamily: 'Geometria-Medium',
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    width: 160,
  },
  tel: {
    fontFamily: 'Geometria-Regular',
    fontSize: 16,
    color: '#808080',
  },
  buble: {
    height: 38,
    width: 38,
    borderRadius: 38,
    backgroundColor: '#5F2EEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  boxColFlex: {
    flexDirection: 'row',
  },
  mt: {
    marginTop: 7,
  },
  aboutTitle: {
    fontFamily: 'Geometria-Medium',
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  aboutText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
    color: '#808080',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F2',
    borderStyle: 'solid',
    marginBottom: 10,
  },
  textList: {
    fontFamily: 'Geometria',
    fontSize: 16,
    marginLeft: 15,
  },
  footer: {
    width: '100%',
    paddingBottom: 40,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  textFooter: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Geometria-Regular',
    color: '#808080',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  form: {
    backgroundColor: 'white',
    elevation: 1,
    width: Dimensions.get('screen').width,
    height: 'auto',
    paddingTop: 30,
  },
  containerModal: {
    width: '88%',
    height: '100%',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    color: '#14142B',
  },
  control: {
    marginBottom: 20,
  },
  controlZero: {
    marginBottom: 0,
  },
  field: {
    marginTop: 10,
  },
  btnCol: {
    width: '27%',
    height: 70,
  },
  controlBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  alert: {
    marginTop: 12,
  },
});
