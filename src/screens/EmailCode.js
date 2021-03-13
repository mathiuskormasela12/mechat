// ===== Auth
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';

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
    setTimeout(() => {
      this.setState((state) => ({
        loading: !state.loading,
      }));
      this.props.navigation.navigate('Full Name');
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
                    <Button onPress={this.handleSubmit}>Continue</Button>
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

export default EmailCode;

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'white',
    minHeight: Dimensions.get('window').height,
  },
  container: {
    height: (100 / 100) * Dimensions.get('window').height,
    width: '75%',
  },
  header: {
    width: '100%',
    height: (30 / 100) * Dimensions.get('window').height,
    justifyContent: 'flex-end',
  },
  form: {
    paddingTop: '15%',
    height: (55 / 100) * Dimensions.get('window').height,
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
