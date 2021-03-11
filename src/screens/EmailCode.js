// ===== Auth
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// import all components
import {
  AuthHeader,
  Container,
  TextField,
  Button,
  MiniLoading,
  Alert,
} from '../components';

class EmailCode extends Component {
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
  }

  render() {
    return (
      <Fragment>
        <View style={styles.hero}>
          <Container style={styles.container}>
            <View style={styles.header}>
              <AuthHeader />
            </View>
            <View style={styles.form}>
              <View style={styles.control}>
                <Text style={styles.label}>E-mail Code</Text>
                <View style={styles.field}>
                  <TextField
                    placeholder="Type Your Email Code..."
                    type="number-pad"
                  />
                  <View style={styles.alert}>
                    <Alert type="danger">Server</Alert>
                  </View>
                </View>
              </View>
              <View style={styles.control}>
                {this.state.loading ? (
                  <MiniLoading />
                ) : (
                  <Button onPress={this.handleSubmit}>Done</Button>
                )}
              </View>
              <Text style={styles.text}>
                Read our Privacy Policy. Tap “Agree & Continue” to accept the
                Terms of Service.
              </Text>
            </View>
          </Container>
        </View>
      </Fragment>
    );
  }
}

export default EmailCode;

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  container: {
    height: '100%',
    width: '75%',
  },
  header: {
    width: '100%',
    height: '30%',
    justifyContent: 'flex-end',
  },
  form: {
    paddingTop: '15%',
    height: '55%',
  },
  control: {
    marginBottom: 25,
  },
  text: {
    fontFamily: 'Geometria',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 15,
  },
  label: {
    marginBottom: 30,
    fontFamily: 'Geometria',
    fontSize: 15,
    textAlign: 'center',
  },
  alert: {
    marginTop: 15,
  },
});
