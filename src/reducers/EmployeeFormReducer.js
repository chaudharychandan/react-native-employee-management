import {
  EMPLOYEE_FIELD_UPDATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_SAVE_FAIL,
  EMPLOYEE_RESET
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_FIELD_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_FAIL:
      return { ...state, error: action.payload };
    case EMPLOYEE_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
