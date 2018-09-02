import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import _ from 'lodash';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeFieldUpdate, employeeReset, employeeUpdate, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
    this.onTextPress = this.onTextPress.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeFieldUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    this.props.employeeReset();
  }

  onSaveButtonPress() {
    const { name, phone, shift, employee: { uid } } = this.props;
    this.props.employeeUpdate({ name, phone, shift, uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const uid = this.props.employee.uid;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onSaveButtonPress}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState(prevState => ({ showModal: !prevState.showModal }))}>
            Fire
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          {'Are you sure you want to fire the employee?'}
        </Confirm>

      </Card>
    );
  }
}

const mapStateToProps = ({ employeeForm: { name, phone, shift } }) => ({
  name, phone, shift
});

export default connect(mapStateToProps, {
  employeeFieldUpdate,
  employeeReset,
  employeeUpdate,
  employeeDelete
})(EmployeeEdit);
