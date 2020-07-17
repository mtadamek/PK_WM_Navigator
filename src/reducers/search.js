import {
  GET_INSTITUTES_REQUEST,
  GET_INSTITUTES_SUCCESS,
  GET_INSTITUTES_ERROR,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GET_INSTITUTES_AND_EMPLOYEES_REQUEST,
  GET_INSTITUTES_AND_EMPLOYEES_SUCCESS,
  GET_INSTITUTES_AND_EMPLOYEES_ERROR,
  SET_SEARCH_QUERY,
  SET_OBJECT_TO_SHOW,
  CLEAR_EMPLOYEES,
} from '../constants/Actions';

const initialState = {
  loading: false,
  institutes: [],
  employees: [],
  all: [],
  objectToShow: null,
  error: null,
  query: '',
  pages: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_INSTITUTES_REQUEST:
      return {...state, loading: true};
    case GET_INSTITUTES_SUCCESS:
      return {
        ...state,
        institutes: payload,
        error: null,
        loading: false,
      };
    case GET_INSTITUTES_ERROR:
      return {...state, error: payload, loading: false};
    case GET_EMPLOYEES_REQUEST:
      return {...state, loading: true};
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, ...payload.list],
        pages: payload.pages,
        error: null,
        loading: false,
      };
    case GET_EMPLOYEES_ERROR:
      return {...state, error: payload, loading: false};
    case GET_INSTITUTES_AND_EMPLOYEES_REQUEST:
      return {...state, loading: true};
    case GET_INSTITUTES_AND_EMPLOYEES_SUCCESS:
      return {...state, ...payload, error: null, loading: false};
    case GET_INSTITUTES_AND_EMPLOYEES_ERROR:
      return {...state, error: payload, loading: false};
    case SET_SEARCH_QUERY:
      return {...state, query: payload};
    case SET_OBJECT_TO_SHOW:
      return {...state, objectToShow: payload};
    case CLEAR_EMPLOYEES:
      return {
        ...state,
        employees: [],
        pages: null,
      };
    default:
      return state;
  }
};
