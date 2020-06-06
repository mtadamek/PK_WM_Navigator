import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_INSTITUTES_REQUEST,
  GET_INSTITUTES_SUCCESS,
  GET_INSTITUTES_ERROR,
  SET_SEARCH_QUERY,
  SET_INSTITUTE_TO_SHOW,
} from '../constants/Actions';

const initialState = {
  loading: false,
  categories: [],
  institutes: [],
  instituteToShow: null,
  error: null,
  query: '',
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return {...state, loading: true};
    case GET_CATEGORIES_SUCCESS:
      return {...state, categories: payload, error: null, loading: false};
    case GET_CATEGORIES_ERROR:
      return {...state, error: payload, loading: false};
    case GET_INSTITUTES_REQUEST:
      return {...state, loading: true};
    case GET_INSTITUTES_SUCCESS:
      return {...state, institutes: payload, error: null, loading: false};
    case GET_INSTITUTES_ERROR:
      return {...state, error: payload, loading: false};
    case SET_SEARCH_QUERY:
      return {...state, query: payload};
    case SET_INSTITUTE_TO_SHOW:
      return {...state, instituteToShow: payload};
    default:
      return state;
  }
};
