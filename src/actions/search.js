import axios, {axiosEmployees} from '../utils/axios';
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
} from '../constants/Actions';

//Async actions

// export const getCategories = () => async dispatch => {
//   try {
//     dispatch(getCategoriesRequest());
//     const res = await axios().get('/api/categories');
//     dispatch(getCategoriesSuccess(res.data));
//   } catch (error) {
//     dispatch(getCategoriesError(error));
//   }
// };

// const getCategoriesRequest = () => ({
//   type: GET_CATEGORIES_REQUEST,
//   payload: null,
// });

// const getCategoriesSuccess = categories => ({
//   type: GET_CATEGORIES_SUCCESS,
//   payload: categories,
// });

// const getCategoriesError = error => ({
//   type: GET_CATEGORIES_ERROR,
//   payload: error,
// });

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

export const getEmployees = instituteId => async dispatch => {
  try {
    dispatch(getEmployeesRequest());

    let data = new FormData();
    data.append(
      'ou',
      'ou=Instytut Informatyki Stosowanej (M-07),ou=Wydział Mechaniczny (M),ou=Wydzialy (W),o=Politechnika Krakowska (PK),dc=pk,dc=pl',
    );
    data.append('child', '1');
    data.append('wybor_szukaj', '1');
    let offset = 1;
    data.append('offset', '1');

    const res = await axiosEmployees().post('/', data);
    const count = Math.ceil(res.data.count / 10);
    console.log('data', data);

    let employees = res.data.list;

    // while (count > offset) {
    //   offset++;
    //   data = new FormData();
    //   data.append(
    //     'ou',
    //     'ou=Instytut Informatyki Stosowanej (M-07),ou=Wydział Mechaniczny (M),ou=Wydzialy (W),o=Politechnika Krakowska (PK),dc=pk,dc=pl',
    //   );
    //   data.append('child', 1);
    //   data.append('wybor_szukaj', 1);
    //   data.append('offset', offset);

    //   const next = await axiosEmployees().post('/', data);
    //   //console.log('next',next.data);
    //   employees = employees.concat(next.data.list);
    // }

    console.log(employees);
    dispatch(getEmployeesSuccess(employees));
  } catch (error) {
    dispatch(getEmployeesError(error));
  }
};

const getEmployeesRequest = () => ({
  type: GET_EMPLOYEES_REQUEST,
  payload: null,
});

const getEmployeesSuccess = employees => ({
  type: GET_EMPLOYEES_SUCCESS,
  payload: employees,
});

const getEmployeesError = error => ({
  type: GET_EMPLOYEES_ERROR,
  payload: error,
});

export const getInstitutesAndEmployees = () => async dispatch => {
  try {
    dispatch(getInstitutesAndEmployeesRequest());
    const [institutes, employees] = await Promise.all([
      axios().get('/api/institutes'),
      axios().get('/api/employees'),
    ]);
    dispatch(
      getInstitutesAndEmployeesSuccess({
        institutes: institutes.data,
        employees: employees.data,
      }),
    );
  } catch (error) {
    dispatch(getInstitutesAndEmployeesError(error));
  }
};

const getInstitutesAndEmployeesRequest = () => ({
  type: GET_INSTITUTES_AND_EMPLOYEES_REQUEST,
  payload: null,
});

const getInstitutesAndEmployeesSuccess = data => ({
  type: GET_INSTITUTES_AND_EMPLOYEES_SUCCESS,
  payload: data,
});

const getInstitutesAndEmployeesError = error => ({
  type: GET_INSTITUTES_AND_EMPLOYEES_ERROR,
  payload: error,
});

//Sync actions

export const setSearchQuery = text => ({
  type: SET_SEARCH_QUERY,
  payload: text,
});

export const setObjectToShow = obj => ({
  type: SET_OBJECT_TO_SHOW,
  payload: obj,
});
