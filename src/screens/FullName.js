// ===== Auth
// import all modules
import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import http from '../services/Services';
import formData from '../helpers/formData';

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
      fullName: null,
      message: null,
      type: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(value) {
    this.setState((currentState) => {
      if (value === '') {
        this.setState({
          message: "Full Name can't be empty",
          type: 'warning',
        });
      }
      return {
        ...currentState,
        fullName: value,
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
        fullName: this.state.fullName,
      });

      const {data} = await http.editFullName(id, form);

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
        showMessage({
          message: 'Success to edit full name',
          type: 'success',
          duration: 2000,
          hideOnPress: true,
        });
        this.props.navigation.navigate('Home');
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
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.field}>
                    <TextField
                      placeholder="Type Your Full Name..."
                      type="default"
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
                      Done
                    </Button>
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
