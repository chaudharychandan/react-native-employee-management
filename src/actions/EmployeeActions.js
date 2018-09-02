import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMPLOYEE_FIELD_UPDATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_SAVE_FAIL,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_RESET
} from './types';

export const employeeFieldUpdate = ({ prop, value }) => ({
  type: EMPLOYEE_FIELD_UPDATE,
  payload: { prop, value }
});

export const employeeReset = () => ({
  type: EMPLOYEE_RESET
});

export const employeeCreate = ({ name, phone, shift }) => {
  const userid = getUID();
  return (dispatch) => {
    firebase.database().ref(`/users/${userid}/employees`)
    .push({
      name,
      phone,
      shift
    })
    .then(() => {
      dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
      Actions.pop();
    })
    .catch((error) => dispatch({
      type: EMPLOYEE_SAVE_FAIL,
      payload: error.message
    }));
  };
};

export const employeesFetch = () => {
  const userid = getUID();
  return (dispatch) => {
    firebase.database().ref(`/users/${userid}/employees`)
    .on('value', snapshot => {
      dispatch({
        type: EMPLOYEES_FETCH_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};

export const employeeUpdate = ({ name, phone, shift, uid }) => {
  const userid = getUID();
  return () => {
    firebase.database().ref(`/users/${userid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then(() => {
      Actions.pop();
    });
  };
};

export const employeeDelete = ({ uid }) => {
  const userid = getUID();
  return (dispatch) => {
    firebase.database().ref(`/users/${userid}/employees/${uid}`)
    .remove()
    .then(() => {
      Actions.pop();
      dispatch({
        type: EMPLOYEE_RESET
      });
    });
  };
};

const getUID = () => {
  const { currentUser: { uid } } = firebase.auth();
  return uid;
};
