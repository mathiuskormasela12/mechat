// ===== Auth
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import http from '../services/Services';
import formData from '../helpers/formData';
import {connect} from 'react-redux';

// import all components
import {
  AuthHeader,
  Container,
  PhoneField,
  TextField,
  Button,
  MiniLoading,
  Alert,
} from '../components';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      phoneNumber: null,
      email: null,
      messageEmail: "Email can't be empty",
      typeEmail: 'warning',
      messagePhone: "Phone number can't be empty",
      typePhone: 'warning',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.navigation.navigate('Home');
    }
  }

  handleInput(name, value) {
    const email = value.match(/[^@$a-z0-9.]/gi);
    if (name === 'phoneNumber') {
      if (!value) {
        this.setState({
          messagePhone: "Phone number can't be empty",
          typePhone: 'warning',
        });
      } else if (value.match(/[^0-9]/gi) !== null || value.length < 11) {
        this.setState({
          messagePhone: 'Invalid Phone Number',
          typePhone: 'warning',
        });
      } else {
        this.setState({
          messagePhone: null,
          typePhone: null,
        });
      }
    } else if (name === 'email') {
      if (!value) {
        this.setState({
          messageEmail: "Email can't be empty",
          typeEmail: 'warning',
        });
      } else if (
        email ||
        !value.match(/@\b/g) ||
        value.match(/\s/) ||
        value.match(/\b[0-9]/) ||
        !value.split('@').pop().includes('.')
      ) {
        this.setState({
          messageEmail: 'Invalid Email',
          typeEmail: 'warning',
        });
      } else {
        this.setState({
          messageEmail: null,
          typeEmail: null,
        });
      }
    }
    this.setState((currentState) => {
      return {
        ...currentState,
        [name]: value,
      };
    });
  }

  async handleSubmit() {
    this.setState((state) => ({
      loading: !state.loading,
    }));
    try {
      const form = formData('URLSearchParams', {
        phoneNumber: `0${this.state.phoneNumber}`,
        email: this.state.email,
      });
      const {data} = await http.auth(form);

      if (data.success) {
        this.setState((currentState) => ({
          ...currentState,
          loading: !currentState.loading,
        }));
        showMessage({
          message: 'Please check your email',
          type: 'success',
          duration: 2000,
          hideOnPress: true,
        });
        this.props.navigation.navigate('Email Code', {id: data.results.id});
      } else {
        this.setState((currentState) => ({
          ...currentState,
          loading: !currentState.loading,
        }));
        showMessage({
          message: data.message,
          type: 'warning',
          duration: 2000,
          hideOnPress: true,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState((currentState) => ({
        ...currentState,
        loading: !currentState.loading,
      }));
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 2000,
        hideOnPress: true,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <ScrollView>
          <View style={styles.hero}>
            <Container style={styles.container}>
              <View style={styles.header}>
                <AuthHeader />
              </View>
              <View style={styles.form}>
                <View style={styles.control}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.field}>
                    <PhoneField
                      value={this.state.phoneNumber}
                      onChangeText={(e) => this.handleInput('phoneNumber', e)}
                    />
                    {this.state.messagePhone && (
                      <View style={styles.alert}>
                        <Alert type={this.state.typePhone}>
                          {this.state.messagePhone}
                        </Alert>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.control}>
                  <Text style={styles.label}>E-mail</Text>
                  <View style={styles.field}>
                    <TextField
                      placeholder="Type Your Email..."
                      type="email-address"
                      value={this.state.email}
                      onChangeText={(e) => this.handleInput('email', e)}
                    />
                    {this.state.messageEmail && (
                      <View style={styles.alert}>
                        <Alert type={this.state.typeEmail}>
                          {this.state.messageEmail}
                        </Alert>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.controlBtn}>
                  {this.state.loading ? (
                    <MiniLoading />
                  ) : !this.state.messageEmail && !this.state.messagePhone ? (
                    <Button onPress={this.handleSubmit}>Send</Button>
                  ) : (
                    <Button onPress={this.handleSubmit} disabled={true}>
                      Send
                    </Button>
                  )}
                </View>
                <Text style={styles.text}>
                  Read our Privacy Policy. Tap “Agree & Continue” to accept the
                  Terms of Service.
                </Text>
              </View>
            </Container>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const mapStateToProps = (states) => ({
  token: states.auth.token,
});

export default connect(mapStateToProps, null)(Auth);

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'white',
    minHeight: Dimensions.get('window').height,
  },
  container: {
    width: '75%',
  },
  header: {
    width: '100%',
    height: 'auto',
    paddingVertical: 50,
  },
  form: {
    paddingBottom: 50,
  },
  control: {
    marginBottom: 25,
  },
  controlBtn: {
    marginBottom: 25,
    marginTop: 10,
  },
  text: {
    fontFamily: 'Geometria',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 15,
  },
  label: {
    marginBottom: 20,
    fontFamily: 'Geometria',
    fontSize: 15,
  },
  alert: {
    marginTop: 15,
  },
});
