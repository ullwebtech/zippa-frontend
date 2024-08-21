import api, { cleanUpErr, cleanUpResponse } from "../helper";
import {
  isError,
  isLoading,
  updateMessage,
  updateThriftSaving,
  updateThriftSavings,
  updateThriftTotal
} from "../slices/thriftSlice";
import { getSavingsTotal, getTransactions, getWallet } from "./walletAsyncActions";

export const getThriftDetails = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getTransactions())
    dispatch(getSavingsTotal());
    dispatch(getThrifts());
    dispatch(getThriftTotal());
  } catch (err) {
    console.log(err);
  }
};

export const createThriftSave = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/thrift`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { thrift } = data;
      dispatch(updateThriftSaving(thrift));
      dispatch(updateMessage("Thrift Created Successfully"));
      dispatch(getThriftDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createThriftSaveCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/thrift/card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { thrift } = data;
      dispatch(updateThriftSaving(thrift));
      dispatch(updateMessage("Thrift Created Successfully"));
      dispatch(getThriftDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const createThriftSaveNewCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/thrift/new-card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { thrift } = data;
      dispatch(updateThriftSaving(thrift));
      dispatch(updateMessage("Thrift Created Successfully"));
      dispatch(getThriftDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getThrifts = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/thrift`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { thrifts } = data;
      dispatch(updateThriftSavings(thrifts));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getThrift = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/thrift/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { thrift } = data;
      dispatch(updateThriftSaving(thrift));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getThriftTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/thrift/total`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateThriftTotal(total));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const withdrawThrift = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/thrift/withdraw/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data);
      dispatch(updateMessage("Thrift Withdrawn Successfully"));
      dispatch(getThriftDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
