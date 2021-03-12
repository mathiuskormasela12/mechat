// ===== Contacts
// import all modules
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

// import all components
import {
  ContactList,
  ModalInput,
  Container,
  ModalButton,
  Alert,
} from '../components';

// import assets
import Icon from 'react-native-vector-icons/Ionicons';

// import all actions
import {showWrapper} from '../redux/actions/loading';

import profile from '../assets/img/profile.png';

class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          name: 'Nayeon',
          status: 'Available',
        },
        {
          name: 'Mina',
          status: 'Avaliable',
        },
        {
          name: 'Sana',
          status: 'Busy',
        },
        {
          name: 'Tzuyu',
          status: 'Listening Music',
        },
        {
          name: 'Momo',
          status: 'Busy',
        },
        {
          name: 'Jihyo',
          status: 'Busy',
        },
        {
          name: 'Dahyun',
          status: 'Busy',
        },
      ],
    };

    this.handleShowWrapper = this.handleShowWrapper.bind(this);
  }

  handleShowWrapper() {
    this.props.showWrapper();
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.loading.showWrapper}>
            <View style={styles.modalContainer}>
              <ScrollView>
                <View style={styles.form}>
                  <Container style={styles.container}>
                    <View style={styles.control}>
                      <Text style={styles.label}>Contact Name</Text>
                      <View style={styles.field}>
                        <ModalInput
                          placeholder="Type Your Contact Name..."
                          type="default"
                        />
                        <View style={styles.alert}>
                          <Alert type="danger" md>
                            Contact Name Can't be empy
                          </Alert>
                        </View>
                      </View>
                    </View>
                    <View style={styles.controlZero}>
                      <Text style={styles.label}>Phone Number</Text>
                      <View style={styles.field}>
                        <ModalInput
                          placeholder="Type Your Contact Name..."
                          type="default"
                        />
                        <View style={styles.alert}>
                          <Alert type="warning" md>
                            Invalid Phone Number
                          </Alert>
                        </View>
                      </View>
                    </View>
                    <View style={styles.controlBtn}>
                      <View style={styles.btnCol}>
                        <ModalButton>Save</ModalButton>
                      </View>
                      <View style={styles.btnCol}>
                        <ModalButton onPress={this.handleShowWrapper}>
                          Cancle
                        </ModalButton>
                      </View>
                    </View>
                  </Container>
                </View>
              </ScrollView>
            </View>
          </Modal>
          <FlatList
            data={this.state.contacts}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <ContactList
                picture={profile}
                name={item.name}
                status={item.status}
              />
            )}
          />
          <TouchableOpacity
            style={styles.contact}
            onPress={this.handleShowWrapper}>
            <Icon name="person-add-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: {
    ...state.loading,
  },
});

const mapDispatchToProps = {
  showWrapper,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  hero: {
    flex: 1,
    backgroundColor: 'white',
  },
  contact: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5F2EEA',
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
  container: {
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
