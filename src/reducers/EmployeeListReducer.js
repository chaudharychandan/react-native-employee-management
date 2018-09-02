import {
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_UPDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    case EMPLOYEE_UPDATE_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
