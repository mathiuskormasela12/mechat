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
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

// import all component
import {Container, ModalInput, ModalButton, Alert} from '../components';

export default function Profile(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [state, setState] = useState({
    label: null,
    placeholder: null,
    name: null,
    type: null,
  });

  const back = () => navigation.navigate('Home');

  const handleCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        console.log(response);
      },
    );
  };

  const handleImgLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        console.log(response);
      },
    );
  };

  const handleShowWrapper = (placeholder, name, label, type) => {
    dispatch({
      type: 'SET_WRAPPER',
    });
    setVisible((visible) => !visible);
    setState((currentState) => ({
      ...currentState,
      placeholder,
      name,
      label,
      type,
    }));
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
                    />
                    <View style={styles.alert}>
                      <Alert type="danger" md>
                        Full Name Can't be empy
                      </Alert>
                    </View>
                  </View>
                </View>
                <View style={styles.controlBtn}>
                  <View style={styles.btnCol}>
                    <ModalButton>Save</ModalButton>
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
                uri:
                  'https://img.okezone.com/content/2020/07/02/33/2239941/nayeon-twice-dapat-ancaman-pembunuhan-fans-viralkan-tagar-protectnayeon-CRG9pqFCPI.jpg',
              }}
              style={styles.img}
            />
          </View>
          <View style={styles.contain}>
            <Container style={styles.mainContainer}>
              <View style={styles.boxContain}>
                <Container style={styles.boxContainer}>
                  <View style={styles.boxCol}>
                    <Text style={styles.name}>Im Nayeon</Text>
                    <Text style={styles.tel}>+629521617622</Text>
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
                      Magical: you leave one person, and you return completely
                      different
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
                    <TouchableOpacity style={styles.list}>
                      <View style={[styles.buble]}>
                        <Icon name="trash" color="white" size={18} />
                      </View>
                      <Text style={styles.textList}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.list, styles.removeMargin]}>
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
