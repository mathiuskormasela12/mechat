// ===== Auth
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import http from '../services/Services';
import formData from '../helpers/formData';
import {connect} from 'react-redux';

// import all actions
import {setToken} from '../redux/actions/auth';

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
      message: "OTP can't be empty",
      type: 'warning',
      otp: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(value) {
    if (!value || value === '') {
      this.setState({
        message: "OTP can't be empty",
        type: 'warning',
      });
    } else if (
      value.length < 6 ||
      value.length > 6 ||
      value.match(/[^0-9]/gi) !== null
    ) {
      this.setState({
        message: 'Invalid OTP',
        type: 'warning',
      });
    } else {
      this.setState({
        message: null,
        type: null,
      });
    }
    this.setState((currentState) => {
      return {
        ...currentState,
        otp: value,
      };
    });
  }

  async handleSubmit() {
    const {id} = this.props.route.params;
    this.setState((state) => ({
      loading: !state.loading,
    }));
    try {
      const form = formData('URLSearchParams', {
        otp: this.state.otp,
      });

      const {data} = await http.checkOtp(id, form);

      if (!data.success) {
        showMessage({
          message: data.message,
          type: 'warning',
          duration: 2000,
          hideOnPress: true,
        });
      } else {
        this.setState((currentState) => ({
          ...currentState,
          loading: !currentState.loading,
        }));
        this.setState({
          otp: null,
        });
        showMessage({
          message: 'Success to verify otp code',
          type: 'success',
          duration: 2000,
          hideOnPress: true,
        });
        setTimeout(() => {
          if (data.results.fullName === '' || !data.results.fullName) {
            this.props.navigation.navigate('Full Name', {
              id,
              token: data.results.token,
            });
          } else {
            this.props.setToken(data.results.token);
            this.props.navigation.navigate('Home');
          }
        }, 2000);
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
                  <Text style={styles.label}>E-mail Code</Text>
                  <View style={styles.field}>
                    <TextField
                      placeholder="Type Your Email Code..."
                      type="number-pad"
                      onChangeText={this.handleInput}
                    />
                    {this.state.message && (
                      <View style={styles.alert}>
                        <Alert type={this.state.type}>
                          {this.state.message}
                        </Alert>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.control}>
                  {this.state.loading ? (
                    <MiniLoading />
                  ) : this.state.message ? (
                    <Button onPress={this.handleSubmit} disabled={true}>
                      Continue
                    </Button>
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

const mapDispatchToProps = {
  setToken,
};

export default connect(null, mapDispatchToProps)(EmailCode);

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
