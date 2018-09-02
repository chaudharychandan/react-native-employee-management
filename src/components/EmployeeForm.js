import React, { Component } from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { employeeFieldUpdate } from '../actions';
import { CardSection, Input } from './common';

class EmployeeForm extends Component {
  render() {
    const { name, phone, shift } = this.props;

    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            onChangeText={value => this.props.employeeFieldUpdate({ prop: 'name', value })}
            value={name}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            onChangeText={value => this.props.employeeFieldUpdate({ prop: 'phone', value })}
            value={phone}
          />
        </CardSection>
        <CardSection>
          <Picker
            style={styles.shiftPickerStyle}
            selectedValue={shift}
            onValueChange={value => this.props.employeeFieldUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shiftPickerStyle: {
    flex: 1
  }
});

const mapStateToProps = ({ employeeForm: { name, phone, shift } }) => ({
  name, phone, shift
});

export default connect(mapStateToProps, { employeeFieldUpdate })(EmployeeForm);
