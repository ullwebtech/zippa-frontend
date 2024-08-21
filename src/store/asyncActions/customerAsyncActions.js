import api, { cleanUpErr, cleanUpResponse } from '../helper';
import {
  isError,
  isLoading,
  updateCustomer,
  updateCustomers,
  updateMessage,
} from '../slices/customerSlice';

export const getCustomer = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/customer/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { user } = data;
      dispatch(updateCustomer(user));
      dispatch(updateMessage('Customer Fetched Successfully'));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
export const getCustomers = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/customer`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { users } = data;
      dispatch(updateCustomers(users));
      dispatch(updateMessage('Customers Fetched Successfully'));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .delete(`/customer/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { msg } = data;
      dispatch(updateMessage(msg));
      dispatch(getCustomers());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
