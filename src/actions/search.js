import axios from '../utils/axios';
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

//Async actions

export const getCategories = () => async dispatch => {
  try {
    dispatch(getCategoriesRequest());
    const res = await axios().get('/api/categories');
    dispatch(getCategoriesSuccess(res.data));
  } catch (error) {
    dispatch(getCategoriesError(error));
  }
};

const getCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST,
  payload: null,
});

const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

const getCategoriesError = error => ({
  type: GET_CATEGORIES_ERROR,
  payload: error,
});

export const getInstitutes = () => async dispatch => {
  try {
    dispatch(getInstitutesRequest());
    const res = await axios().get('/api/institutes');
    dispatch(getInstitutesSuccess(res.data));
  } catch (error) {
    dispatch(getInstitutesError(error));
  }
};

const getInstitutesRequest = () => ({
  type: GET_INSTITUTES_REQUEST,
  payload: null,
});

const getInstitutesSuccess = institutes => ({
  type: GET_INSTITUTES_SUCCESS,
  payload: institutes,
});

const getInstitutesError = error => ({
  type: GET_INSTITUTES_ERROR,
  payload: error,
});

//Sync actions

export const setSearchQuery = text => ({
  type: SET_SEARCH_QUERY,
  payload: text,
});

export const setInstituteToShow = institute => ({
  type: SET_INSTITUTE_TO_SHOW,
  payload: institute,
});