import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import _ from 'lodash';

import { connect } from 'react-redux';
import { employeesFetch } from '../actions';

import { Card } from './common';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
  }

  render() {
    return (
      <View style={styles.employeesListStyle}>
        <FlatList
          data={this.props.employees}
          renderItem={({ item }) =>
            <Card>
              <EmployeeListItem employee={item} />
            </Card>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  employeesListStyle: {
    flex: 1
  }
});


const mapStateToProps = ({ employeeList }) => {
  const employees = _.map(employeeList, (val, uid) => ({ ...val, uid }));
  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
