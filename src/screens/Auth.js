// ===== Auth
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';

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

  handleInput(name, value) {
    const email = value.match(/[^@$a-z0-9.]/gi);
    this.setState((currentState) => {
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
            messageEmail: "Phone number can't be empty",
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
      return {
        ...currentState,
        [name]: value,
      };
    });
  }

  handleSubmit() {
    this.setState((state) => ({
      loading: !state.loading,
    }));
    setTimeout(() => {
      this.setState((state) => ({
        loading: !state.loading,
      }));
      this.props.navigation.navigate('Email Code');
    }, 2000);
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

export default Auth;

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
