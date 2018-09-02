import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';

import LoginForm from './LoginForm';
import EmployeeList from './EmployeeList';
import EmployeeCreate from './EmployeeCreate';
import EmployeeEdit from './EmployeeEdit';

const RouterComponent = () =>
<Router>
  <Scene key="root" hideNavBar>
    <Scene key="auth">
      <Scene key="login" component={LoginForm} title="Please Login" initial />
    </Scene>
    <Scene key="main">
      <Scene
        key="employeeList"
        component={EmployeeList}
        title="Employees"
        initial
        rightTitle="Add"
        onRight={() => { Actions.employeeCreate(); }}
      />
      <Scene
        key="employeeCreate"
        component={EmployeeCreate}
        title="Create Employee"
        leftTitle="Back"
      />
      <Scene
        key="employeeEdit"
        component={EmployeeEdit}
        title="Edit Employee"
        leftTitle="Back"
      />
    </Scene>
  </Scene>
</Router>;

export default RouterComponent;
