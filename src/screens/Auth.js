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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
                    <PhoneField />
                    {/* <View style={styles.alert}>
                      <Alert type="danger">Ini Pesan</Alert>
                    </View> */}
                  </View>
                </View>
                <View style={styles.control}>
                  <Text style={styles.label}>E-mail</Text>
                  <View style={styles.field}>
                    <TextField
                      placeholder="Type Your Email..."
                      type="email-address"
                    />
                    {/* <View style={styles.alert}>
                      <Alert type="warning">Ini Pesan</Alert>
                    </View> */}
                  </View>
                </View>
                <View style={styles.controlBtn}>
                  {this.state.loading ? (
                    <MiniLoading />
                  ) : (
                    <Button onPress={this.handleSubmit}>Send</Button>
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
