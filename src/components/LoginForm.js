import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import { emailChanged, passwordChanged, loginUser } from '../actions';

import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    const { error } = this.props;

    if (error) {
      return (
        <CardSection>
          <Text style={styles.errorTextStyle}>
            {error}
          </Text>
        </CardSection>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" color="#00ffff" />;
    }

    return <Button onPress={this.onLoginButtonPress}>Login</Button>;
  }

  render() {
    const { email, password } = this.props;
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="abc@xyz.com"
            onChangeText={this.onEmailChange}
            value={email}
          />
        </CardSection>
        <CardSection>
        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={this.onPasswordChange}
          value={password}
        />
        </CardSection>
          {this.renderError()}
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth: { email, password, user, error, loading } }) => ({
  email, password, user, error, loading
});

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
